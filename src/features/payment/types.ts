import type { GroupMember, Payment, PaymentBy, PaymentFor } from "@/generated/prisma";

export type PaymentLists = Payment & {
  paymentBy: PaymentBy & {
    groupMember: GroupMember;
  };
  paymentFor: (PaymentFor & {
    groupMember: GroupMember;
  })[];
};
