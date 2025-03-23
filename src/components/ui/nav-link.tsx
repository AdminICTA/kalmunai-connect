
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export const NavLink = ({
  to,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "nav-item transition-colors",
        isActive 
          ? "text-primary font-medium" 
          : "text-foreground/80 hover:text-foreground",
        isMobile && "text-base py-2",
        className,
        isActive && activeClassName
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
