"use server";

import { type CreateGroupInput, createGroupSchema } from "@/features/group/validators/group";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function createGroup(input: CreateGroupInput) {
  try {
    const validatedData = createGroupSchema.parse(input);

    const group = await prisma.$transaction(async (tx) => {
      const newGroup = await tx.group.create({
        data: {
          name: validatedData.groupName,
        },
      });

      await tx.groupMember.createMany({
        data: validatedData.members.map((member) => ({
          groupId: newGroup.id,
          name: member.name,
        })),
      });

      return newGroup;
    });

    return {
      success: true,
      data: group,
    };
  } catch (error) {
    console.error("グループ作成エラー:", error);

    if (error instanceof Error) {
      throw new Error(`グループの作成に失敗しました: ${error.message}`);
    }

    throw new Error("グループの作成に失敗しました");
  } finally {
    await prisma.$disconnect();
  }
}
