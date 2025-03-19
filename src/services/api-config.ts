
/**
 * API configuration for connecting to the backend
 */

// Base API URL - change this to your PHP backend URL when deployed
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://dskalmunai.lk/api' 
  : 'http://localhost/dskalmunai/api';

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login.php`,
    REGISTER: `${API_BASE_URL}/auth/register.php`,
    LOGOUT: `${API_BASE_URL}/auth/logout.php`,
  },
  // User management endpoints
  USERS: {
    GET_ALL: `${API_BASE_URL}/users/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/users/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/users/create.php`,
    UPDATE: `${API_BASE_URL}/users/update.php`,
    DELETE: `${API_BASE_URL}/users/delete.php`,
  },
  // Services endpoints
  SERVICES: {
    GET_ALL: `${API_BASE_URL}/services/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/services/get-by-id.php?id=${id}`,
    APPLY: `${API_BASE_URL}/services/apply.php`,
  },
  // Dashboard stats
  STATS: {
    ADMIN: `${API_BASE_URL}/stats/admin.php`,
    STAFF: `${API_BASE_URL}/stats/staff.php`,
    PUBLIC: `${API_BASE_URL}/stats/public.php`,
  },
  // Department endpoints
  DEPARTMENTS: {
    GET_ALL: `${API_BASE_URL}/departments/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/departments/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/departments/create.php`,
    UPDATE: `${API_BASE_URL}/departments/update.php`,
    DELETE: `${API_BASE_URL}/departments/delete.php`,
  }
};
