"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createGroup as createGroupAction } from "@/features/new/actions/group";
import { createGroupSchema } from "@/validators/group";
import type { Member } from "../types";

export const useGroupForm = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const addMember = () => {
    if (!memberName.trim()) {
      setErrors((prev) => ({ ...prev, memberName: "メンバー名を入力してください" }));
      return;
    }

    const newMember: Member = {
      id: crypto.randomUUID(),
      name: memberName.trim(),
    };

    setMembers((prev) => [...prev, newMember]);
    setMemberName("");
    setErrors((prev) => ({ ...prev, memberName: "" }));
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const createGroup = () => {
    const input = {
      groupName: groupName.trim(),
      members,
    };

    const validation = createGroupSchema.safeParse(input);

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
        const result = await createGroupAction(validation.data);
        if (result.success) {
          router.push(`/group/${result.data.id}/share`);
        }
      } catch (error) {
        console.error("グループ作成エラー:", error);
        setErrors({
          general: error instanceof Error ? error.message : "グループの作成に失敗しました",
        });
      }
    });
  };

  return {
    groupName,
    memberName,
    members,
    errors,
    isPending,
    setGroupName,
    setMemberName,
    addMember,
    removeMember,
    createGroup,
  };
};
