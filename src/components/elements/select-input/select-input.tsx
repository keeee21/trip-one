interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectInput = ({ id, value, onChange, options, placeholder }: SelectInputProps) => (
  <select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
