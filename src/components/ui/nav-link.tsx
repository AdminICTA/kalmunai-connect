
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void; // Added onClick prop
}

export const NavLink = ({
  to,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "nav-item",
        isActive && "active",
        className,
        isActive && activeClassName
      )}
      onClick={onClick} // Pass onClick to the Link component
    >
      {children}
    </Link>
  );
};
