
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/auth-service";
import { toast } from "sonner";

export type UserRole = "admin" | "staff" | "employee" | "public" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
  isEmployee: boolean;
  isPublic: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if the user is authenticated using our service
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Session verification failed");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In development mode, still use the mock login for testing
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_REAL_API) {
        // Mock login for development
        let mockUser: User;
        
        if (email.includes("admin")) {
          mockUser = { id: "1", name: "Admin User", email, role: "admin" };
        } else if (email.includes("staff")) {
          mockUser = { id: "2", name: "Staff User", email, role: "staff" };
        } else if (email.includes("employee")) {
          mockUser = { id: "3", name: "Employee User", email, role: "employee" };
        } else {
          mockUser = { id: "4", name: "Public User", email, role: "public" };
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        // Use the real authentication service for production
        const response = await authService.login(email, password);
        if (response.success && response.user) {
          setUser(response.user as User);
        } else {
          throw new Error(response.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Use the auth service to handle logout
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === "admin",
    isStaff: user?.role === "staff",
    isEmployee: user?.role === "employee",
    isPublic: user?.role === "public",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
