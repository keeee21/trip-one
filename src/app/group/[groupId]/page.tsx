import GroupContainer from "./container";

type Props = {
  params: Promise<{ groupId: string }>;
};

export default async function Group({ params }: Props) {
  const resolvedParams = await params;
  return <GroupContainer groupId={resolvedParams.groupId} />;
}
