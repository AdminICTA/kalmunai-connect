
import { User } from "@/types/user";

export interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onViewIdCard: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}
