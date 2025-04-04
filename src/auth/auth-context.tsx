
import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/auth-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  // Check for existing session on component mount
  React.useEffect(() => {
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
        
        // Navigate based on role
        const roleId = response.user.role_id;
        if (roleId === "Admin") {
          navigate("/dashboard/admin");
        } else if (roleId === "Staff") {
          navigate("/dashboard/staff");
        } else if (roleId === "User") {
          navigate("/dashboard/user");
        } else {
          navigate("/");
        }
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
    navigate("/");
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
