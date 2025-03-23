// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * API Endpoints Configuration
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/login.php',
    LOGOUT: '/logout.php'
  },
  USERS: {
    GET_ALL: '/get-users.php',
    GET_ONE: (id: string) => `/users/get.php?id=${id}`,
    UPDATE: '/users/update.php',
    REGISTER: '/users/register.php', // New endpoint for public registration
  },
  MESSAGES: {
    GET_ALL: (userId: string) => `/messages/get-all.php?user_id=${userId}`,
    SEND: '/messages/send.php',
    MARK_READ: '/messages/mark-read.php'
  },
  // Add other endpoints as needed
};
