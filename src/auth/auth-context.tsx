
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
          console.log("User authenticated:", currentUser);
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
      // Use the auth service for all login attempts
      const response = await authService.login(usernameOrEmail, password);
      if (response.success && response.user) {
        setUser(response.user as User);
        console.log("Login successful:", response.user);
      } else {
        throw new Error(response.message || "Login failed");
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
    console.log("User logged out");
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
