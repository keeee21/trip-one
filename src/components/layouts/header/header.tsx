import type React from "react";

type Props = {
  title: string;
};

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <div className="bg-red-400 text-white text-center py-4 text-xl font-semibold">{title}</div>
  );
};
