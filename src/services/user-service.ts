
import { apiService } from './api-service';
import { ENDPOINTS } from './api-config';
import { toast } from 'sonner';
import { User, UserResponse } from '@/types/user';

/**
 * Service for user management API calls
 */
class UserService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiService.get<UserResponse>(ENDPOINTS.USERS.GET_ALL);
      
      if (!response.success) {
        toast.error(response.message || 'Failed to fetch users');
        return [];
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Get all users error:', error);
      toast.error('Failed to fetch users');
      return [];
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await apiService.get<UserResponse>(ENDPOINTS.USERS.GET_ONE(id));
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to fetch user');
        return null;
      }
      
      return response.data as User;
    } catch (error) {
      console.error('Get user by ID error:', error);
      toast.error('Failed to fetch user');
      return null;
    }
  }

  /**
   * Create a new user
   */
  async createUser(userData: Omit<User, 'id' | 'qr_code'>, qrCode?: string): Promise<User | null> {
    try {
      // Add qr_code to the userData if provided
      const dataToSend = {
        ...userData,
        qr_code: qrCode || `DSPUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
      
      const response = await apiService.post<UserResponse>(ENDPOINTS.USERS.CREATE, dataToSend);
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to create user');
        return null;
      }
      
      toast.success('User created successfully');
      return response.data as User;
    } catch (error) {
      console.error('Create user error:', error);
      toast.error('Failed to create user');
      return null;
    }
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const response = await apiService.put<UserResponse>(ENDPOINTS.USERS.UPDATE, {
        id,
        ...userData,
      });
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to update user');
        return null;
      }
      
      toast.success('User updated successfully');
      return response.data as User;
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('Failed to update user');
      return null;
    }
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      const response = await apiService.delete<UserResponse>(ENDPOINTS.USERS.DELETE, { id });
      
      if (!response.success) {
        toast.error(response.message || 'Failed to delete user');
        return false;
      }
      
      toast.success('User deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Failed to delete user');
      return false;
    }
  }
}

export const userService = new UserService();
