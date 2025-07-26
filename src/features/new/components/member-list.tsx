import { Button } from "@/components/elements/button/button";
import type { Member } from "../types";

interface MemberListProps {
  members: Member[];
  onRemove: (id: string) => void;
}

export const MemberList = ({ members, onRemove }: MemberListProps) => {
  if (members.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
        >
          <span>{member.name}</span>
          <Button
            variant="secondary"
            onClick={() => onRemove(member.id)}
            className="px-2 py-1 text-sm"
          >
            削除
          </Button>
        </div>
      ))}
    </div>
  );
};
