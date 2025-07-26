import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  children,
  className = "",
}: ButtonProps) => {
  const baseClass = "px-6 py-3 rounded-lg transition-colors";
  const variantClass =
    variant === "primary"
      ? "bg-red-400 text-white hover:bg-red-500"
      : "text-red-500 hover:bg-red-50";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};
