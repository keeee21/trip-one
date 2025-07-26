import { NavigationButton } from "@/components/elements/navigation-button/navigation-button";
import type { GroupData } from "@/features/group/types";

interface GroupPresenterProps {
  groupData: GroupData;
}

export default function GroupPresenter({ groupData }: GroupPresenterProps) {
  const { groupId, groupName } = groupData;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* グループ情報 */}
          <div className="bg-white rounded-lg px-4">
            <h1 className="text-xl font-bold text-gray-800">{groupName}</h1>
          </div>

          <NavigationButton
            href={`/group/${groupId}/payment/new`}
            className="block w-full py-4 text-center bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors text-lg font-semibold"
          >
            立替え記録を追加
          </NavigationButton>
          <p className="text-gray-500 text-sm">今後実装予定です</p>
        </div>
      </div>
    </div>
  );
}
