// src/components/navigation/NavigationLink.tsx
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: "ghost" | "default" | "outline";
  className?: string;
}

export const NavigationLink = ({ 
  to, 
  children, 
  variant = "ghost",
  className = "" 
}: NavigationLinkProps) => {
  return (
    <Link to={to}>
      <Button variant={variant} className={className}>
        {children}
      </Button>
    </Link>
  );
};