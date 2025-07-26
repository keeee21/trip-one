"use server";

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function fetchGroupData(groupId: string) {
  return prisma.group.findUnique({
    where: { id: groupId },
    include: {
      groupMembers: true,
    },
  });
}
