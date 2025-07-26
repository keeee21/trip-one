import PaymentNewContainer from "./container";

type Props = {
  params: Promise<{ groupId: string }>;
};

export default async function PaymentNew({ params }: Props) {
  const resolvedParams = await params;
  return <PaymentNewContainer groupId={resolvedParams.groupId} />;
}
