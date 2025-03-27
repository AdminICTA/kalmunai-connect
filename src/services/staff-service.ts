
import { apiService } from './api-service';
import { ENDPOINTS } from './api-config';
import { toast } from 'sonner';
import { Staff, StaffResponse, Department } from '@/types/staff';

/**
 * Service for staff management API calls
 */
class StaffService {
  /**
   * Get all staff members
   */
  async getAllStaff(): Promise<Staff[]> {
    try {
      const response = await apiService.get<StaffResponse>(ENDPOINTS.STAFF.GET_ALL);
      
      if (!response.success) {
        toast.error(response.message || 'Failed to fetch staff');
        return [];
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Get all staff error:', error);
      toast.error('Failed to fetch staff');
      return [];
    }
  }

  /**
   * Get staff by ID
   */
  async getStaffById(id: string): Promise<Staff | null> {
    try {
      const response = await apiService.get<StaffResponse>(ENDPOINTS.STAFF.GET_ONE(id));
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to fetch staff member');
        return null;
      }
      
      return response.data as Staff;
    } catch (error) {
      console.error('Get staff by ID error:', error);
      toast.error('Failed to fetch staff member');
      return null;
    }
  }

  /**
   * Get staff by NIC
   */
  async getStaffByNIC(nic: string): Promise<Staff | null> {
    try {
      const response = await apiService.get<StaffResponse>(ENDPOINTS.STAFF.GET_BY_NIC(nic));
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to fetch staff member');
        return null;
      }
      
      return response.data as Staff;
    } catch (error) {
      console.error('Get staff by NIC error:', error);
      toast.error('Failed to fetch staff member');
      return null;
    }
  }

  /**
   * Get staff by name
   */
  async getStaffByName(name: string): Promise<Staff[]> {
    try {
      const response = await apiService.get<StaffResponse>(ENDPOINTS.STAFF.GET_BY_NAME(name));
      
      if (!response.success) {
        toast.error(response.message || 'Failed to fetch staff');
        return [];
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Get staff by name error:', error);
      toast.error('Failed to fetch staff');
      return [];
    }
  }

  /**
   * Get staff by designation
   */
  async getStaffByDesignation(designation: string): Promise<Staff[]> {
    try {
      const response = await apiService.get<StaffResponse>(ENDPOINTS.STAFF.GET_BY_DESIGNATION(designation));
      
      if (!response.success) {
        toast.error(response.message || 'Failed to fetch staff');
        return [];
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Get staff by designation error:', error);
      toast.error('Failed to fetch staff');
      return [];
    }
  }

  /**
   * Create a new staff member
   */
  async createStaff(staffData: Omit<Staff, 'id'>): Promise<Staff | null> {
    try {
      const response = await apiService.post<StaffResponse>(ENDPOINTS.STAFF.CREATE, staffData);
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to create staff member');
        return null;
      }
      
      toast.success('Staff member created successfully');
      return response.data as Staff;
    } catch (error) {
      console.error('Create staff error:', error);
      toast.error('Failed to create staff member');
      return null;
    }
  }

  /**
   * Update an existing staff member
   */
  async updateStaff(id: string, staffData: Partial<Staff>): Promise<Staff | null> {
    try {
      const response = await apiService.put<StaffResponse>(ENDPOINTS.STAFF.UPDATE, {
        id,
        ...staffData,
      });
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to update staff member');
        return null;
      }
      
      toast.success('Staff member updated successfully');
      return response.data as Staff;
    } catch (error) {
      console.error('Update staff error:', error);
      toast.error('Failed to update staff member');
      return null;
    }
  }

  /**
   * Delete a staff member
   */
  async deleteStaff(id: string): Promise<boolean> {
    try {
      const response = await apiService.delete<StaffResponse>(ENDPOINTS.STAFF.DELETE, { id });
      
      if (!response.success) {
        toast.error(response.message || 'Failed to delete staff member');
        return false;
      }
      
      toast.success('Staff member deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete staff error:', error);
      toast.error('Failed to delete staff member');
      return false;
    }
  }

  /**
   * Get all departments with divisions
   */
  async getAllDepartmentsWithDivisions(): Promise<Department[]> {
    try {
      const response = await apiService.get<{ success: boolean; data?: Department[] }>(
        ENDPOINTS.DEPARTMENTS.GET_WITH_DIVISIONS
      );
      
      if (!response.success || !response.data) {
        toast.error(response.message || 'Failed to fetch departments');
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error('Get departments error:', error);
      toast.error('Failed to fetch departments');
      return [];
    }
  }
}

export const staffService = new StaffService();
