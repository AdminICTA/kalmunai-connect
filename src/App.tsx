
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "@/auth/auth-context";

// Pages
import Index from "./pages/Index";
import Login from "./pages/login";
import AdminDashboard from "./pages/dashboard/admin";
import StaffDashboard from "./pages/dashboard/staff";
import EmployeeDashboard from "./pages/dashboard/employee";
import PublicDashboard from "./pages/dashboard/public";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <Navigate 
            to={user ? `/dashboard/${user.role_id.toLowerCase()}` : "/login"} 
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
        path="/dashboard/employee" 
        element={
          <ProtectedRoute requiredRole={["Admin", "Staff", "User"]}>
            <EmployeeDashboard />
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
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
