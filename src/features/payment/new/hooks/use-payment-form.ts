"use client";

import { useState, useTransition } from "react";
import { createPayment } from "@/features/payment/new/actions/payment";
import { createPaymentSchema } from "@/features/payment/new/validators/payment";

export const usePaymentForm = (groupId: string) => {
  const [payerId, setPayerId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const handleMemberToggle = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers((prev) => [...prev, memberId]);
    } else {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
    }
    // メンバー選択のエラーをクリア
    setErrors((prev) => ({ ...prev, selectedMembers: "" }));
  };

  const handleSubmit = () => {
    // バリデーション
    const input = {
      groupId,
      payerId,
      title: title.trim(),
      amount: Number(amount) || 0,
      selectedMembers,
    };

    const validation = createPaymentSchema.safeParse(input);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // エラーをクリア
    setErrors({});

    // サーバーアクションを実行
    startTransition(async () => {
      try {
        await createPayment(validation.data);
      } catch (error) {
        console.error("支払い登録エラー:", error);
        setErrors({
          general: error instanceof Error ? error.message : "支払いの登録に失敗しました",
        });
      }
    });
  };

  return {
    payerId,
    title,
    amount,
    selectedMembers,
    errors,
    isPending,
    setPayerId,
    setTitle,
    setAmount,
    handleMemberToggle,
    handleSubmit,
  };
};
