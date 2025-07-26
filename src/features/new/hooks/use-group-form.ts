import { useRouter } from "next/navigation";
import { useState } from "react";
import type { GroupFormData, Member } from "../types";

export const useGroupForm = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const addMember = () => {
    if (memberName.trim()) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: memberName.trim(),
      };
      setMembers((prev) => [...prev, newMember]);
      setMemberName("");
    }
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const createGroup = async () => {
    const groupData: GroupFormData = {
      groupName,
      members,
    };

    console.log("Creating group:", groupData);

    // TODO: API呼び出し後、実際のgroupIdを取得
    const mockGroupId = Date.now().toString();

    // 作成完了ページに遷移
    router.push(`/group/${mockGroupId}/share`);
  };

  return {
    // State
    groupName,
    memberName,
    members,
    // Actions
    setGroupName,
    setMemberName,
    addMember,
    removeMember,
    createGroup,
  };
};
