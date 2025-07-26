import { z } from "zod";

export const createGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, "グループ名は必須です")
    .max(50, "グループ名は50文字以内で入力してください"),
  members: z
    .array(
      z.object({
        id: z.string(),
        name: z
          .string()
          .min(1, "メンバー名は必須です")
          .max(30, "メンバー名は30文字以内で入力してください"),
      }),
    )
    .min(1, "メンバーは最低1人必要です")
    .max(20, "メンバーは20人まで追加できます"),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
