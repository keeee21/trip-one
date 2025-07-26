import Link from "next/link";

interface NavigationButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const NavigationButton = ({ href, className, children }: NavigationButtonProps) => (
  <div className="w-full">
    <Link href={href} className={className}>
      {children}
    </Link>
  </div>
);
