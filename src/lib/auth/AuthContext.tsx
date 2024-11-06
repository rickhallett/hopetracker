// src/lib/auth/AuthContext.tsx
import { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { User, AuthState } from './types';
import { mockAuth } from './mockAuth';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; user: User }
  | { type: 'ERROR'; error: string }
  | { type: 'SIGNOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { user: action.user, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.error };
    case 'SIGNOUT':
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    dispatch({ type: 'SUCCESS', user: user || null });
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      dispatch({ type: 'LOADING' });
      const user = await mockAuth.signUp(email, password, name);
      dispatch({ type: 'SUCCESS', user });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOADING' });
      const user = await mockAuth.signIn(email, password);
      dispatch({ type: 'SUCCESS', user });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      dispatch({ type: 'LOADING' });
      await mockAuth.signOut();
      dispatch({ type: 'SIGNOUT' });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};