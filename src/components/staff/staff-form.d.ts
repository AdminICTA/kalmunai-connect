
import { Department, Staff } from "@/types/staff";

export interface StaffFormProps {
  onClose: () => void;
  departments: Department[];
  onSuccess: () => void;
  staffData?: Staff;
}
