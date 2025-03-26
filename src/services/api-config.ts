
// API Base URL
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://dskalmunai.lk/api'  // Production URL - ensure this points to your cPanel
  : 'https://dskalmunai.lk/api';  // Force production URL for all environments

/**
 * API Endpoints Configuration
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/login.php',
    LOGOUT: '/logout.php',
    REGISTER: '/auth/register.php'
  },
  USERS: {
    GET_ALL: '/get-users.php',
    GET_ONE: (id: string) => `/users/get.php?id=${id}`,
    GET_BY_ID: (id: string) => `/users/get.php?id=${id}`,
    UPDATE: '/users/update.php',
    CREATE: '/users/create.php',
    DELETE: '/users/delete.php',
    REGISTER: '/users/register.php',
  },
  MESSAGES: {
    GET_ALL: (userId: string) => `/messages/get-all.php?user_id=${userId}`,
    SEND: '/messages/send.php',
    MARK_READ: '/messages/mark-read.php'
  },
  SMS: {
    SEND: '/sms/send.php',
    VERIFY: '/sms/verify.php',
    NOTIFY: '/sms/notify.php'
  },
  SMS_LENZ: {
    SEND: 'https://smslenz.lk/api/send-sms',
    BULK_SEND: 'https://smslenz.lk/api/send-bulk'
  },
  // Test connection endpoint
  TEST: {
    CONNECTION: '/test-connection.php'
  }
};
