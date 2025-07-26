import React from "react";

interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export const TextInput = ({ id, value, onChange, placeholder, onKeyPress }: TextInputProps) => (
  <input
    id={id}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
  />
);
