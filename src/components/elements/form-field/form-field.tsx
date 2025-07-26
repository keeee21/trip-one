import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const FormField = ({ id, label, children }: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 text-sm mb-2">
      {label}
    </label>
    {children}
  </div>
);
