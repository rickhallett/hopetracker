// src/pages/NotFound.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Search,
  AlertCircle,
  ChevronLeft,
  ExternalLink 
} from "lucide-react";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="text-center space-y-8 max-w-2xl">
        {/* Error Icon */}
        <div className="relative">
          <AlertCircle className="h-24 w-24 mx-auto text-muted-foreground" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            404: Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground">
            Oops! It seems like you've ventured into uncharted territory.
          </p>
        </div>

        {/* Helpful Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">You might want to:</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Button 
                variant="link" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center"
              >
                Check your dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                onClick={() => navigate('/features')}
                className="flex items-center"
              >
                Explore our features
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                onClick={() => window.location.href = 'mailto:support@hct.com'}
                className="flex items-center"
              >
                Contact support
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </li>
          </ul>
        </div>

        {/* Search Suggestion */}
        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            If you believe this is a mistake, please{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal"
              onClick={() => window.location.href = 'mailto:support@hct.com'}
            >
              let us know
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
