
// Define shared user types to avoid duplication and type conflicts
export interface User {
  id: string;
  qr_code: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  nic: string;
  role?: string;
}

export interface PublicUserFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  nic: string;
}

export interface UserResponse {
  success: boolean;
  data?: User | User[];
  message?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  user?: User; // Added to make the user data available
}
