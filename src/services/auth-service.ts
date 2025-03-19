
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
      toast.error('Login failed. Please try again.');
      throw error;
    }
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
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    try {
      // Call the logout endpoint (optional, depends on your backend implementation)
      await apiService.post(ENDPOINTS.AUTH.LOGOUT, {});
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
