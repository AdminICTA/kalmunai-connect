
import { createContext, useContext, useState, useEffect } from "react";

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

  // Mock function to simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for an existing session here
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, you would call your API here
      // This is just for demonstration purposes
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
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
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
