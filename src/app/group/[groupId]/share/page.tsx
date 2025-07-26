import ShareContainer from "./container";

type Props = {
  params: Promise<{ groupId: string }>;
};

export default async function Share({ params }: Props) {
  const resolvedParams = await params;
  return <ShareContainer groupId={resolvedParams.groupId} />;
}
