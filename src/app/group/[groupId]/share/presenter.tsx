"use client";

import { NavigationButton } from "@/components/elements/navigation-button/navigation-button";
import { SuccessIcon } from "@/components/elements/success-icon/success-icon";
import { UrlCopyBox } from "@/features/group/components/url-copy-box";
import type { ShareInitialData } from "@/features/group/types";

interface SharePresenterProps {
  initialData: ShareInitialData;
}

export default function SharePresenter({ initialData }: SharePresenterProps) {
  const { groupId, baseUrl } = initialData;
  const groupUrl = `${baseUrl}/group/${groupId}`;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <SuccessIcon />

        <h1 className="text-xl font-bold text-gray-800 text-center">グループを作成しました！</h1>

        <p className="text-gray-600 text-center text-sm leading-relaxed px-4">
          まずはグループページのURLをコピーして、
          <br />
          LINEなどでメンバーに共有しましょう。
        </p>

        <UrlCopyBox url={groupUrl} />

        <NavigationButton
          href={`/group/${groupId}`}
          className="block w-full py-4 text-center bg-white text-red-400 border-2 border-red-400 rounded-lg hover:bg-red-50 transition-colors text-lg font-medium"
        >
          グループページへ進む
        </NavigationButton>
      </div>
    </div>
  );
}
