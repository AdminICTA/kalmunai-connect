
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
  // Public user management endpoints
  PUBLIC_USERS: {
    GET_ALL: `${API_BASE_URL}/public-users/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/public-users/get-by-id.php?id=${id}`,
    GET_BY_QR: (qrCode: string) => `${API_BASE_URL}/public-users/get-by-qr.php?qr_code=${qrCode}`,
    CREATE: `${API_BASE_URL}/public-users/create.php`,
    UPDATE: `${API_BASE_URL}/public-users/update.php`,
    DELETE: `${API_BASE_URL}/public-users/delete.php`,
    GENERATE_ID_CARD: (id: string) => `${API_BASE_URL}/public-users/generate-id-card.php?id=${id}`,
  },
  // Services endpoints
  SERVICES: {
    GET_ALL: `${API_BASE_URL}/services/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/services/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/services/create.php`,
    UPDATE: `${API_BASE_URL}/services/update.php`,
    DELETE: `${API_BASE_URL}/services/delete.php`,
    APPLY: `${API_BASE_URL}/services/apply.php`,
  },
  // Dashboard stats
  STATS: {
    ADMIN: `${API_BASE_URL}/stats/admin.php`,
    STAFF: `${API_BASE_URL}/stats/staff.php`,
    PUBLIC: `${API_BASE_URL}/stats/public.php`,
    EMPLOYEE: `${API_BASE_URL}/stats/employee.php`,
  },
  // Department endpoints
  DEPARTMENTS: {
    GET_ALL: `${API_BASE_URL}/departments/get-all.php`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/departments/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/departments/create.php`,
    UPDATE: `${API_BASE_URL}/departments/update.php`,
    DELETE: `${API_BASE_URL}/departments/delete.php`,
  },
  // Division endpoints
  DIVISIONS: {
    GET_ALL: `${API_BASE_URL}/divisions/get-all.php`,
    GET_BY_DEPARTMENT: (departmentId: string) => `${API_BASE_URL}/divisions/get-by-department.php?department_id=${departmentId}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/divisions/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/divisions/create.php`,
    UPDATE: `${API_BASE_URL}/divisions/update.php`,
    DELETE: `${API_BASE_URL}/divisions/delete.php`,
  },
  // Leave request endpoints
  LEAVE_REQUESTS: {
    GET_ALL: `${API_BASE_URL}/leave-requests/get-all.php`,
    GET_BY_STAFF: (staffId: string) => `${API_BASE_URL}/leave-requests/get-by-staff.php?staff_id=${staffId}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/leave-requests/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/leave-requests/create.php`,
    UPDATE: `${API_BASE_URL}/leave-requests/update.php`,
    APPROVE: `${API_BASE_URL}/leave-requests/approve.php`,
    REJECT: `${API_BASE_URL}/leave-requests/reject.php`,
  },
  // Public service request endpoints
  SERVICE_REQUESTS: {
    GET_ALL: `${API_BASE_URL}/service-requests/get-all.php`,
    GET_BY_PUBLIC_USER: (userId: string) => `${API_BASE_URL}/service-requests/get-by-public-user.php?public_user_id=${userId}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/service-requests/get-by-id.php?id=${id}`,
    CREATE: `${API_BASE_URL}/service-requests/create.php`,
    UPDATE_STATUS: `${API_BASE_URL}/service-requests/update-status.php`,
  },
  // Forms endpoints
  FORMS: {
    GET_ALL: `${API_BASE_URL}/forms/get-all.php`,
    GET_BY_DEPARTMENT: (departmentId: string) => `${API_BASE_URL}/forms/get-by-department.php?department_id=${departmentId}`,
    DOWNLOAD: (id: string) => `${API_BASE_URL}/forms/download.php?id=${id}`,
  },
  // Payments endpoints
  PAYMENTS: {
    GET_PENDING: (userId: string) => `${API_BASE_URL}/payments/get-pending.php?user_id=${userId}`,
    GET_HISTORY: (userId: string) => `${API_BASE_URL}/payments/get-history.php?user_id=${userId}`,
    PROCESS: `${API_BASE_URL}/payments/process.php`,
  },
  // Messages endpoints
  MESSAGES: {
    GET_ALL: (userId: string) => `${API_BASE_URL}/messages/get-all.php?user_id=${userId}`,
    MARK_READ: `${API_BASE_URL}/messages/mark-read.php`,
    SEND: `${API_BASE_URL}/messages/send.php`,
  },
};
