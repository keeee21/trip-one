"use client";

import { NavigationButton } from "@/components/elements/navigation-button/navigation-button";
import { PaymentLists } from "@/features/payment/types";

import { Group, GroupMember } from "@/generated/prisma";

type GroupWithMembers = Group & {
  groupMembers: GroupMember[];
};

export default function GroupPresenter({
  group,
  paymentList,
}: {
  group: GroupWithMembers;
  paymentList: PaymentLists[];
}) {
  const { id: groupId, name: groupName } = group;

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `(${month}/${day})`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{groupName}</h2>
        {/* 立替え記録を追加ボタン */}
        <NavigationButton
          href={`/group/${groupId}/payment/new`}
          className="block w-full py-4 text-center border-2 border-red-400 text-red-400 rounded-lg hover:bg-red-50 transition-colors text-lg font-semibold"
        >
          立替え記録を追加
        </NavigationButton>

        {/* 支払い履歴 */}
        <div className="space-y-2">
          {paymentList.map((payment) => (
            <div
              key={payment.id}
              className="bg-white p-4 rounded-lg border border-gray-200 relative"
            >
              {/* 編集アイコン */}
              <button
                type="button"
                className="absolute top-4 right-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>編集</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>

              {/* タイトル */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 pr-8">{payment.title}</h3>

              {/* 支払った人と日付 */}
              <p className="text-gray-600 text-sm mb-1">
                {payment.paymentBy?.groupMember.name}が立替え {formatDate(payment.createdAt)}
              </p>

              {/* 金額 */}
              <div className="flex justify-between items-center mb-3">
                <div />
                <span className="text-2xl font-bold text-gray-800">
                  ¥{payment.amount.toLocaleString()}
                </span>
              </div>

              {/* 分割対象メンバー */}
              <div className="flex items-center space-x-2">
                {payment.paymentFor.slice(0, 6).map((paymentFor) => (
                  <div
                    key={paymentFor.id}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 border"
                  >
                    {paymentFor.groupMember.name.charAt(0)}
                  </div>
                ))}
                {payment.paymentFor.length > 4 && (
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 border">
                    +{payment.paymentFor.length - 4}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
