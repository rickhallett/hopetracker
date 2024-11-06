// src/routes/index.tsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogIn } from 'lucide-react';
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import { AuthGuard } from '@/lib/auth/AuthGuard';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';

// Layout Components
const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center" onClick={() => window.location.href = '/'}>
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">HCT</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = '/features'}>
                Features
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/dashboard'}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/analytics'}>
                Analytics
              </Button>
              <Button 
                variant={isLoggedIn ? "outline" : "default"}
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? "Sign Out" : "Sign In"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start" 
                onClick={() => window.location.href = '/features'}>
                Features
              </Button>
              <Button variant="ghost" className="w-full justify-start"
                onClick={() => window.location.href = '/dashboard'}>
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start"
                onClick={() => window.location.href = '/analytics'}>
                Analytics
              </Button>
              <Button 
                variant={isLoggedIn ? "outline" : "default"}
                className="w-full justify-start"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? "Sign Out" : "Sign In"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="ml-2 font-bold">HCT</span>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost">Privacy</Button>
              <Button variant="ghost">Terms</Button>
              <Button variant="ghost">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Placeholder Components for Routes
const Dashboard = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to your homework tracking dashboard!</p>
  </div>
);

const Features = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Features</h1>
    <p>Explore our powerful features for homework tracking.</p>
  </div>
);

const Analytics = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Analytics</h1>
    <p>View detailed analytics of your homework completion.</p>
  </div>
);

// Router Configuration
const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'dashboard',
          element: (
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          ),
        },
        {
          path: 'features',
          element: <Features />,
        },
        {
          path: 'analytics',
          element: (
            <AuthGuard>
              <Analytics />
            </AuthGuard>
          ),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
  
  export const Routes = () => {
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  };