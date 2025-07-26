"use server";

import { redirect } from "next/navigation";
import {
  type CreatePaymentInput,
  createPaymentSchema,
} from "@/features/payment/new/validators/payment";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function createPayment(input: CreatePaymentInput) {
  try {
    // バリデーション
    const validatedData = createPaymentSchema.parse(input);

    // トランザクションで支払い情報を保存
    await prisma.$transaction(async (tx) => {
      // 支払い情報を保存
      const newPayment = await tx.payment.create({
        data: {
          groupId: validatedData.groupId,
          title: validatedData.title,
          amount: validatedData.amount,
        },
      });

      // 支払った人の情報を保存
      await tx.paymentBy.create({
        data: {
          paymentId: newPayment.id,
          groupMemberId: validatedData.payerId,
        },
      });

      // 分割対象のメンバー情報を保存
      await tx.paymentFor.createMany({
        data: validatedData.selectedMembers.map((memberId) => ({
          paymentId: newPayment.id,
          groupMemberId: memberId,
        })),
      });

      return newPayment;
    });

    // グループページにリダイレクト
    redirect(`/group/${validatedData.groupId}`);
  } catch (error) {
    // Next.jsのリダイレクトエラーは再度投げる
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("支払い登録エラー:", error);

    if (error instanceof Error) {
      throw new Error(`支払いの登録に失敗しました: ${error.message}`);
    }

    throw new Error("支払いの登録に失敗しました");
  } finally {
    await prisma.$disconnect();
  }
}
