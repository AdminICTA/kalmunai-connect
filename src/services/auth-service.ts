import { apiService } from './api-service';
import { ENDPOINTS } from './api-config';
import { toast } from 'sonner';

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role_id: string;
    department_id?: string;
  };
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

/**
 * Service for authentication-related API calls
 */
class AuthService {
  /**
   * Log in a user with email/username and password
   */
  async login(usernameOrEmail: string, password: string): Promise<LoginResponse> {
    // Use mock login for development mode unless explicitly configured to use real API
    if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_REAL_API) {
      return this.mockLogin(usernameOrEmail, password);
    }

    try {
      const response = await apiService.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
        username_or_email: usernameOrEmail,
        password,
      });

      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Login successful!');
      } else {
        toast.error(response.message || 'Login failed');
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      
      // If API call fails in development, fall back to mock login
      if (process.env.NODE_ENV === 'development') {
        console.log('API login failed, falling back to mock login');
        return this.mockLogin(usernameOrEmail, password);
      }
      
      toast.error('Login failed. Please try again.');
      throw error;
    }
  }

  /**
   * Mock login for development purposes
   */
  private async mockLogin(usernameOrEmail: string, password: string): Promise<LoginResponse> {
    console.log('Using mock login with:', usernameOrEmail);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let mockUser;
    
    if (usernameOrEmail.includes("icta") || usernameOrEmail === "ICTA") {
      mockUser = { 
        id: "u1", 
        username: "ICTA", 
        email: "icta@dskalmunai.com", 
        role_id: "Admin",
        department_id: "ADM1"
      };
    } else if (usernameOrEmail.includes("farhana") || usernameOrEmail === "Farhana") {
      mockUser = { 
        id: "u2", 
        username: "Farhana", 
        email: "farhana@dskalmunai.com", 
        role_id: "Admin",
        department_id: "ADR1"
      };
    } else if (usernameOrEmail.includes("staff") || usernameOrEmail === "Staff") {
      mockUser = { 
        id: "u3", 
        username: "Staff", 
        email: "staff@dskalmunai.com", 
        role_id: "Staff",
        department_id: "LND1"
      };
    } else if (usernameOrEmail.includes("marliya") || usernameOrEmail === "Marliya") {
      mockUser = { 
        id: "u4", 
        username: "Marliya", 
        email: "marliya@dskalmunai.com", 
        role_id: "User",
        department_id: "ACC1"
      };
    } else {
      mockUser = { 
        id: "u5", 
        username: "Maya", 
        email: "maya@dskalmunai.com", 
        role_id: "User",
        department_id: "NIC1"
      };
    }
    
    // Store auth data in localStorage
    const mockToken = "mock-token-" + Date.now();
    localStorage.setItem("auth_token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    toast.success('Login successful!');
    
    return {
      success: true,
      token: mockToken,
      user: mockUser,
      message: "Mock login successful"
    };
  }

  /**
   * Register a new user
   */
  async register(userData: {
    username: string;
    email: string;
    password: string;
    role_id?: string;
    department_id?: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await apiService.post<RegisterResponse>(ENDPOINTS.AUTH.REGISTER, userData);
      
      if (response.success) {
        toast.success('Registration successful!');
      } else {
        toast.error(response.message || 'Registration failed');
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (process.env.NODE_ENV === 'development') {
        // Mock successful registration in development
        toast.success('Mock registration successful!');
        return { success: true, message: 'Mock registration successful' };
      }
      
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    try {
      // In production, call the logout endpoint
      if (process.env.NODE_ENV !== 'development') {
        await apiService.post(ENDPOINTS.AUTH.LOGOUT, {});
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    }
  }

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Get the current user from localStorage
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();
