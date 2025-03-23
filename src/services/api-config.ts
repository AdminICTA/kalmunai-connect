
// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * API Endpoints Configuration
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/login.php',
    LOGOUT: '/logout.php',
    REGISTER: '/auth/register.php'  // Added missing REGISTER endpoint
  },
  USERS: {
    GET_ALL: '/get-users.php',
    GET_ONE: (id: string) => `/users/get.php?id=${id}`,
    GET_BY_ID: (id: string) => `/users/get.php?id=${id}`,  // Added missing GET_BY_ID endpoint
    UPDATE: '/users/update.php',
    CREATE: '/users/create.php',  // Added missing CREATE endpoint
    DELETE: '/users/delete.php',  // Added missing DELETE endpoint
    REGISTER: '/users/register.php', // Public registration endpoint
  },
  MESSAGES: {
    GET_ALL: (userId: string) => `/messages/get-all.php?user_id=${userId}`,
    SEND: '/messages/send.php',
    MARK_READ: '/messages/mark-read.php'
  },
  // Add other endpoints as needed
};
