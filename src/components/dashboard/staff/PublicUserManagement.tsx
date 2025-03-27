import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/auth/auth-context";
import { UserService } from '@/services/user-service';
import { UsersTable } from './UsersTable';
import { UserSearchBar } from './UserSearchBar';
import { AddUserModal } from './AddUserModal';
import { EditUserModal } from './EditUserModal';
import { IdCardModal } from './IdCardModal';
import { UserNotifications } from './UserNotifications';
import { ActionButtons } from './ActionButtons';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PublicUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedTab, setSelectedTab] = useState('active');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [selectedTab]);

  const loadUsers = async () => {
    try {
      let fetchedUsers = [];
      if (selectedTab === 'active') {
        fetchedUsers = await UserService.getAllUsers();
      } else if (selectedTab === 'inactive') {
        fetchedUsers = await UserService.getInactiveUsers();
      }
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load users.',
      });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = searchTerm
    ? users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleViewIdCard = (user) => {
    setSelectedUser(user);
    setIsIdCardModalOpen(true);
  };

  const handleUserUpdated = () => {
    loadUsers();
  };

  const handleNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="active">Active Users</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Users</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center">
        <UserSearchBar onSearch={handleSearch} />
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <UsersTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onViewIdCard={handleViewIdCard}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleUserUpdated}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />

      <IdCardModal
        isOpen={isIdCardModalOpen}
        onClose={() => {
          setIsIdCardModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <UserNotifications notifications={notifications} onClear={clearNotifications} />
    </div>
  );
};

export default PublicUserManagement;
