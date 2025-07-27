"use server";

import { Group, GroupMember, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

type GroupWithMembers = Group & {
  groupMembers: GroupMember[];
};

export async function fetchGroupData(groupId: string): Promise<GroupWithMembers | null> {
  return prisma.group.findUnique({
    where: { id: groupId },
    include: {
      groupMembers: true,
    },
  });
}
