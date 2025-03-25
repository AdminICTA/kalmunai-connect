
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  qr_code: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  nic: string;
}

interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onViewIdCard: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const UsersTable = ({ users, onEditUser, onViewIdCard, onDeleteUser }: UsersTableProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-3 text-left font-medium">QR Code</th>
            <th className="px-4 py-3 text-left font-medium">Full Name</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Phone</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-3">{user.qr_code}</td>
              <td className="px-4 py-3">{user.full_name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.phone}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditUser(user)}
                    className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewIdCard(user)}
                    className="bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                  >
                    ID Card
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/public-details/${user.id}`)}
                    className="bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDeleteUser(user.id)}
                    className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
