import type { GroupMember } from "@/generated/prisma";

export interface Member extends Omit<GroupMember, "createdAt" | "updatedAt" | "groupId"> {
  groupId?: string;
}

export interface GroupFormData {
  groupName: string;
  members: Member[];
}
