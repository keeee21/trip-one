"use client";

import { Button } from "@/components/elements/button/button";
import { FormField } from "@/components/elements/form-field/form-field";
import { TextInput } from "@/components/elements/text-input/text-input";
import { MemberList } from "@/features/new/components";
import { useGroupForm } from "@/features/new/hooks/use-group-form";

export default function NewPresenter() {
  const {
    groupName,
    memberName,
    members,
    errors,
    isPending,
    setGroupName,
    setMemberName,
    addMember,
    removeMember,
    createGroup,
  } = useGroupForm();

  return (
    <div>
      <div className="p-6 space-y-6 pb-24">
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <FormField id="groupName" label="グループ名">
          <TextInput
            id="groupName"
            value={groupName}
            onChange={setGroupName}
            placeholder="北海道旅行"
          />
          {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName}</p>}
        </FormField>

        <FormField id="memberName" label="メンバー名">
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <TextInput
                id="memberName"
                value={memberName}
                onChange={setMemberName}
                placeholder="メンバー名を入力"
                onKeyPress={(e) => e.key === "Enter" && addMember()}
              />
            </div>
            <Button onClick={addMember} disabled={isPending}>
              追加
            </Button>
          </div>
          {errors.memberName && <p className="text-red-500 text-sm mt-1">{errors.memberName}</p>}
          {errors.members && <p className="text-red-500 text-sm mt-1">{errors.members}</p>}
          <MemberList members={members} onRemove={removeMember} />
        </FormField>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-6 bg-white">
        <Button
          onClick={createGroup}
          disabled={isPending}
          className="w-full py-2 text-lg font-semibold"
        >
          {isPending ? "作成中..." : "グループを作成"}
        </Button>
      </div>
    </div>
  );
}
