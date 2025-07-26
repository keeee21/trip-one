"use client";

import { Button } from "@/components/elements/button/button";
import { MemberCheckbox } from "@/components/elements/checkbox/checkbox";
import { SelectInput } from "@/components/elements/select-input/select-input";
import { TextInput } from "@/components/elements/text-input/text-input";
import { usePaymentForm } from "@/features/payment/new/hooks/use-payment-form";

import type { Group, GroupMember } from "@/generated/prisma";

type GroupWithMembers = Group & {
  groupMembers: GroupMember[];
};

export default function PaymentNewPresenter({ group }: { group: GroupWithMembers }) {
  const {
    payerId,
    title,
    amount,
    selectedMembers,
    errors,
    isPending,
    setPayerId,
    setTitle,
    setAmount,
    handleMemberToggle,
    handleSubmit,
  } = usePaymentForm(group.id);

  const memberOptions = group.groupMembers.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
    <div className="p-6 space-y-6 pb-32">
      {/* 全体のエラーメッセージ */}
      {errors.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* 支払った人の選択 */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <SelectInput
            id="payer"
            value={payerId}
            onChange={setPayerId}
            options={memberOptions}
            placeholder="選択してください"
          />
          <span className="text-gray-700">が</span>
        </div>
        {errors.payerId && <p className="text-red-500 text-sm">{errors.payerId}</p>}
      </div>

      {/* 分割対象メンバーの選択 */}
      <div className="space-y-3">
        {group.groupMembers.map((member) => (
          <MemberCheckbox
            key={member.id}
            member={member}
            checked={selectedMembers.includes(member.id)}
            onChange={handleMemberToggle}
          />
        ))}
        {errors.selectedMembers && <p className="text-red-500 text-sm">{errors.selectedMembers}</p>}
      </div>

      {/* 支払い内容と金額 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">の</span>
            <div className="flex-1">
              <TextInput id="title" value={title} onChange={setTitle} placeholder="タクシー代" />
            </div>
            <span className="text-gray-700">を払って、</span>
          </div>
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">¥</span>
            <div className="flex-1">
              <TextInput id="amount" value={amount} onChange={setAmount} placeholder="4800" />
            </div>
            <span className="text-gray-700">かかった。</span>
          </div>
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>
      </div>

      {/* ボタン群 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-6 bg-white space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-3 text-lg font-semibold"
        >
          {isPending ? "登録中..." : "登録"}
        </Button>
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() => window.history.back()}
          className="w-full py-3 text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          戻る
        </Button>
      </div>
    </div>
  );
}
