
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-muted animate-pulse opacity-30"></div>
          <FileX className="h-20 w-20 text-muted-foreground/40 relative z-10" />
        </div>
        <h1 className="mt-8 text-4xl font-bold">404</h1>
        <p className="mt-2 text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
