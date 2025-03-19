
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
    if (user?.role && !roles.includes(user.role)) {
      return <Navigate to={`/dashboard/${user.role}`} />;
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
            to={user ? `/dashboard/${user.role}` : "/login"} 
            replace 
          />
        } 
      />
      
      <Route 
        path="/dashboard/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/staff" 
        element={
          <ProtectedRoute requiredRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/employee" 
        element={
          <ProtectedRoute requiredRole={["staff", "employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard/public" 
        element={
          <ProtectedRoute requiredRole="public">
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
