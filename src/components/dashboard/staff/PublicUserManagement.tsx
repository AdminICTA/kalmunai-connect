
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { userService } from "@/services/user-service";
import UsersTable from "./UsersTable";
import UserSearchBar from "./UserSearchBar";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import IdCardModal from "./IdCardModal";
import UserNotifications from "./UserNotifications";
import ActionButtons from "./ActionButtons";

const PublicUserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    fetchNotifications();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getAllUsers();
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      // This is a placeholder - implement actual notification fetching
      // In a real app, you would fetch notifications from an API
      setNotifications([
        {
          id: 1,
          message: "New user registration pending approval",
          timestamp: new Date(),
          read: false,
        },
        {
          id: 2,
          message: "User ID card request #12345 is ready for printing",
          timestamp: new Date(Date.now() - 3600000),
          read: false,
        },
      ]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const searchLower = term.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.nic?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.mobile?.includes(term)
      );
    });
    setFilteredUsers(filtered);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleViewIdCard = (user: any) => {
    setSelectedUser(user);
    setIsIdCardModalOpen(true);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <UserSearchBar onSearch={handleSearch} />
        
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersTable 
        users={filteredUsers} 
        onEdit={handleEditUser}
        onViewIdCard={handleViewIdCard}
      />

      <AddUserModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen}
        onUserAdded={fetchUsers}
      />

      {selectedUser && (
        <EditUserModal 
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={selectedUser}
          onUserUpdated={fetchUsers}
        />
      )}

      {selectedUser && (
        <IdCardModal 
          open={isIdCardModalOpen}
          onOpenChange={setIsIdCardModalOpen}
          user={selectedUser}
        />
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <UserNotifications 
          notifications={notifications} 
          onClearAll={handleClearNotifications} 
        />
      </div>
    </div>
  );
};

export default PublicUserManagement;
