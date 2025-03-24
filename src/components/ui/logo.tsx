
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export const Logo = ({ className, size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/1653f8d3-e04b-42ea-80a5-9021dda30af2.png" 
        alt="Divisional Secretariat - Kalmunai Logo"
        className={cn("object-contain", sizes[size])}
      />
      {withText && (
        <div className="ml-3">
          <h1 className="text-lg font-medium leading-tight text-kalmunai-darkNavy">Divisional Secretariat</h1>
          <h2 className="text-sm text-kalmunai-teal">Kalmunai</h2>
        </div>
      )}
    </div>
  );
};
