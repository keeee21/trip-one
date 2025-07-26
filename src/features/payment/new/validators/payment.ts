import { z } from "zod";

export const createPaymentSchema = z.object({
  groupId: z.string().min(1, "グループIDは必須です"),
  payerId: z.string().min(1, "支払った人の選択は必須です"),
  title: z
    .string()
    .min(1, "支払い内容は必須です")
    .max(100, "支払い内容は100文字以内で入力してください"),
  amount: z
    .number()
    .min(1, "金額は1円以上で入力してください")
    .max(1000000, "金額は100万円以下で入力してください"),
  selectedMembers: z
    .array(z.string())
    .min(1, "分割対象のメンバーを最低1人選択してください")
    .max(20, "分割対象のメンバーは20人まで選択できます"),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
