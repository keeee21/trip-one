interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  type = "button",
  onClick,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) => {
  const baseClass = "px-6 py-3 rounded-lg transition-colors";
  const variantClass =
    variant === "primary"
      ? "bg-red-400 text-white hover:bg-red-500"
      : "text-red-500 hover:bg-red-50";

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
};
