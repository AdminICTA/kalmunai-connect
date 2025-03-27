
import { API_BASE_URL, ENDPOINTS } from './api-config';
import { Staff, Department, StaffResponse, Designation } from '@/types/staff';

/**
 * Staff Service
 * Handles all staff-related API calls
 */
export const StaffService = {
  /**
   * Get all staff members
   */
  getAllStaff: async (): Promise<Staff[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.GET_ALL}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get staff members');
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  },
  
  /**
   * Get staff member by ID
   */
  getStaffById: async (id: string): Promise<Staff | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.GET_ONE(id)}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get staff member');
      }
      
      return data.data || null;
    } catch (error) {
      console.error(`Error fetching staff member with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Get staff member by NIC
   */
  getStaffByNIC: async (nic: string): Promise<Staff | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.GET_BY_NIC(nic)}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get staff member');
      }
      
      return data.data || null;
    } catch (error) {
      console.error(`Error fetching staff member with NIC ${nic}:`, error);
      throw error;
    }
  },
  
  /**
   * Get staff members by name
   */
  getStaffByName: async (name: string): Promise<Staff[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.GET_BY_NAME(name)}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get staff members');
      }
      
      return Array.isArray(data.data) ? data.data : [data.data].filter(Boolean);
    } catch (error) {
      console.error(`Error fetching staff members with name ${name}:`, error);
      throw error;
    }
  },
  
  /**
   * Get staff members by designation
   */
  getStaffByDesignation: async (designation: Designation): Promise<Staff[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.GET_BY_DESIGNATION(designation)}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get staff members');
      }
      
      return Array.isArray(data.data) ? data.data : [data.data].filter(Boolean);
    } catch (error) {
      console.error(`Error fetching staff members with designation ${designation}:`, error);
      throw error;
    }
  },
  
  /**
   * Create new staff member
   */
  createStaff: async (staffData: Omit<Staff, 'id'>): Promise<Staff> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create staff member');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }
  },
  
  /**
   * Update staff member
   */
  updateStaff: async (id: string, staffData: Partial<Staff>): Promise<Staff> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.UPDATE}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...staffData }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update staff member');
      }
      
      return data.data;
    } catch (error) {
      console.error(`Error updating staff member with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete staff member
   */
  deleteStaff: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF.DELETE}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete staff member');
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting staff member with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get all departments with their divisions
   */
  getAllDepartmentsWithDivisions: async (): Promise<Department[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.DEPARTMENTS.GET_WITH_DIVISIONS}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get departments with divisions');
      }
      
      return data.data || [];
    } catch (error) {
      console.error('Error fetching departments with divisions:', error);
      throw error;
    }
  }
};
