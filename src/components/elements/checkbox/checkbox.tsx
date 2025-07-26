interface MemberCheckboxProps {
  member: {
    id: string;
    name: string;
  };
  checked: boolean;
  onChange: (memberId: string, checked: boolean) => void;
}

export const MemberCheckbox = ({ member, checked, onChange }: MemberCheckboxProps) => (
  <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(member.id, e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
          checked ? "bg-red-400 border-red-400" : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <title>チェック済み</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
    <span className="text-gray-700">{member.name}</span>
  </label>
);
