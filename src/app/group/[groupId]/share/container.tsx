import type { ShareInitialData } from "@/features/group/types";
import SharePresenter from "./presenter";

interface ShareContainerProps {
  groupId: string;
}

export default function ShareContainer({ groupId }: ShareContainerProps) {
  // サーバーサイドでの初期データ設定
  const initialData: ShareInitialData = {
    groupId,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  };

  return <SharePresenter initialData={initialData} />;
}
