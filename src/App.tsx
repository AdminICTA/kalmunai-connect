
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "@/auth/auth-context";
import { UserProvider } from "@/contexts/user-context";

// Pages
import Index from "./pages/Index";
import Login from "./pages/login";
import AdminDashboard from "./pages/dashboard/admin";
import StaffDashboard from "./pages/dashboard/staff";
import EmployeeDashboard from "./pages/dashboard/employee";
import PublicDashboard from "./pages/dashboard/public";
import PublicDetails from "./pages/PublicDetails";
import SettingsPage from "./pages/settings";
import NotFound from "./pages/NotFound";
import Services from "./pages/services";
import About from "./pages/about";
import Contact from "./pages/contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string | string[] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (user?.role_id && !roles.includes(user.role_id)) {
      // Redirect based on role_id from our database structure
      return <Navigate to={`/dashboard/${user.role_id.toLowerCase()}`} />;
    }
  }

  return <>{children}</>;
};

// Provide some user feedback when loading auth state
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading screen while auth state is being determined
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* New routes for public pages */}
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <Navigate 
            to={user ? `/dashboard/${user.role_id?.toLowerCase()}` : "/login"} 
            replace 
          />
        } 
      />
      
      <Route 
        path="/dashboard/admin" 
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/staff" 
        element={
          <ProtectedRoute requiredRole="Staff">
            <StaffDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/user" 
        element={
          <ProtectedRoute requiredRole="User">
            <PublicDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/employee" 
        element={
          <ProtectedRoute requiredRole={["Admin", "Staff"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Public details route - accessible to staff */}
      <Route 
        path="/public-details/:id" 
        element={
          <ProtectedRoute requiredRole="Staff">
            <PublicDetails />
          </ProtectedRoute>
        } 
      />
      
      {/* Settings route - accessible to all authenticated users */}
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Documentation route - will add more pages as needed */}
      <Route path="/documentation" element={<div className="container py-8">Documentation</div>} />
      <Route path="/privacy" element={<div className="container py-8">Privacy Policy</div>} />
      <Route path="/terms" element={<div className="container py-8">Terms of Service</div>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
