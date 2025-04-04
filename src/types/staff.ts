
export interface Staff {
  id: string;
  fullName: string;
  nic: string;
  address: string;
  mobileNumber: string;
  dob: string;
  dateOfBirth?: string; // Added for compatibility
  age: number;
  appointmentDate: string;
  currentPost: string;
  grade: string;
  division: string;
  department: string;
  gender?: string;
  email?: string;
  servicePeriod?: string;
  employeeId?: string;
  fatherName?: string;
  fatherStatus?: 'living' | 'deceased';
  motherName?: string;
  motherStatus?: 'living' | 'deceased';
  spouseName?: string;
  spouseAddress?: string;
  spouseMobile?: string;
  children?: {
    name: string;
    age: number;
  }[];
  family?: {
    fatherName: string;
    fatherStatus: 'living' | 'deceased';
    motherName: string;
    motherStatus: 'living' | 'deceased';
    spouse?: {
      name: string;
      address: string;
      mobileNumber: string;
    };
    children: {
      name: string;
      age: number;
    }[];
  };
}

export interface Department {
  id: string;
  name: string;
  divisions: Division[];
}

export interface Division {
  id: string;
  name: string;
}

export interface StaffResponse {
  success: boolean;
  data?: Staff | Staff[];
  message?: string;
}

export type Designation = 
  | 'DS' 
  | 'AO' 
  | 'ADO' 
  | 'DCO' 
  | 'MSO' 
  | 'DO' 
  | 'ICTA' 
  | 'KKP' 
  | 'Other';
