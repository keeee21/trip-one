import { fetchGroupData } from "@/features/group/actions/fetch-group-data";
import { fetchPaymentList } from "@/features/payment/actions/fetch-payment-list";
import GroupPresenter from "./presenter";

interface GroupContainerProps {
  groupId: string;
}

export default async function GroupContainer({ groupId }: GroupContainerProps) {
  const group = await fetchGroupData(groupId);

  if (!group) {
    return <div>グループが見つかりません</div>;
  }

  // 立替え記録を取得
  const paymentList = await fetchPaymentList(groupId);

  return <GroupPresenter group={group} paymentList={paymentList} />;
}
