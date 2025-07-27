"use server";

import { PrismaClient } from "@/generated/prisma";
import { PaymentLists } from "../types";

const prisma = new PrismaClient();

export async function fetchPaymentList(groupId: string): Promise<PaymentLists[]> {
  return prisma.payment.findMany({
    where: { groupId },
    include: {
      paymentBy: {
        include: {
          groupMember: true,
        },
      },
      paymentFor: {
        include: {
          groupMember: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
