
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/auth-service";
import { toast } from "sonner";

export type UserRole = "Admin" | "Staff" | "User" | null;

interface User {
  id: string;
  username: string;
  email: string;
  role_id: UserRole;
  department_id?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
  isUser: boolean;
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

  const login = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    try {
      // In development mode, still use the mock login for testing if not using real API
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_REAL_API) {
        // Mock login for development using the actual database structure
        let mockUser: User;
        
        if (usernameOrEmail.includes("icta") || usernameOrEmail.includes("farhana")) {
          mockUser = { 
            id: "u1", 
            username: "ICTA", 
            email: "icta@dskalmunai.com", 
            role_id: "Admin",
            department_id: "ADM1"
          };
        } else if (usernameOrEmail.includes("marliya")) {
          mockUser = { 
            id: "u3", 
            username: "Marliya", 
            email: "marliya@dskalmunai.com", 
            role_id: "User",
            department_id: "ACC1"
          };
        } else {
          mockUser = { 
            id: "u4", 
            username: "Maya", 
            email: "maya@dskalmunai.com", 
            role_id: "User",
            department_id: "NIC1"
          };
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        // Use the real authentication service for production
        const response = await authService.login(usernameOrEmail, password);
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
    isAdmin: user?.role_id === "Admin",
    isStaff: user?.role_id === "Staff",
    isUser: user?.role_id === "User",
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
