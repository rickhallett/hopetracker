// src/lib/auth/AuthGuard.tsx
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";

// Simple auth state management - replace with your auth system
export const useAuth = () => {
  // This is a mock - replace with real auth logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  const login = () => localStorage.setItem('isAuthenticated', 'true');
  const logout = () => localStorage.setItem('isAuthenticated', 'false');

  return {
    isAuthenticated,
    login,
    logout,
  };
};

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login while saving the attempted URL
      navigate('/login', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Alert className="max-w-md">
          <AlertDescription>
            Please sign in to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};
