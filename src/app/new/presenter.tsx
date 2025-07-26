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
    setGroupName,
    setMemberName,
    addMember,
    removeMember,
    createGroup,
  } = useGroupForm();

  return (
    <div>
      <div className="p-6 space-y-6 pb-24">
        <FormField id="groupName" label="グループ名">
          <TextInput
            id="groupName"
            value={groupName}
            onChange={setGroupName}
            placeholder="北海道旅行"
          />
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
            <Button onClick={addMember}>追加</Button>
          </div>
          <MemberList members={members} onRemove={removeMember} />
        </FormField>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-6 bg-white">
        <Button onClick={createGroup} className="w-full py-2 text-lg font-semibold">
          グループを作成
        </Button>
      </div>
    </div>
  );
}
