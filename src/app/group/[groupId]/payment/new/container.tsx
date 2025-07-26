import { fetchGroupData } from "@/features/group/actions/fetch-group-data";
import PaymentNewPresenter from "./presenter";

interface GroupContainerProps {
  groupId: string;
}

export default async function PaymentNewContainer({ groupId }: GroupContainerProps) {
  const group = await fetchGroupData(groupId);

  if (!group) {
    return <div>グループが見つかりません</div>;
  }

  return <PaymentNewPresenter group={group} />;
}
