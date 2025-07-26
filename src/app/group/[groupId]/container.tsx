import type { GroupData } from "@/features/group/types";
import GroupPresenter from "./presenter";

interface GroupContainerProps {
  groupId: string;
}

export default async function GroupContainer({ groupId }: GroupContainerProps) {
  // サーバーサイドでのデータフェッチ
  const groupData = await fetchGroupData(groupId);

  return <GroupPresenter groupData={groupData} />;
}

// Mock API function - 実際の実装では外部APIを呼び出す
async function fetchGroupData(groupId: string): Promise<GroupData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    groupId,
    groupName: "北海道旅行",
  };
}
