
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "@/services/user-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, PublicUserFormData } from "@/types/user";

// Import the refactored components
import UserNotifications from "./UserNotifications";
import ActionButtons from "./ActionButtons";
import UserSearchBar from "./UserSearchBar";
import UsersTable from "./UsersTable";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import IdCardModal from "./IdCardModal";

// Define interfaces for notification types
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  user: User;
  isRead: boolean;
}

// Define the public user schema
const publicUserFormSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  nic: z.string().min(10, "NIC must be at least 10 characters"),
});

const PublicUserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isViewIdCardModalOpen, setIsViewIdCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [publicUsers, setPublicUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Form for adding a new public user
  const publicUserForm = useForm<PublicUserFormData>({
    resolver: zodResolver(publicUserFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      address: "",
      nic: "",
    },
  });

  // Edit user form
  const editUserForm = useForm<PublicUserFormData>({
    resolver: zodResolver(publicUserFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      address: "",
      nic: "",
    },
  });

  // Fetch notifications (simulated)
  useEffect(() => {
    // Simulate fetching notifications from backend
    const mockNotifications = [
      { 
        id: "n1", 
        type: "new_registration", 
        title: "New Registration", 
        message: "Fathima Rizna has registered through online portal", 
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user: { 
          id: "p1", 
          qr_code: "DSPUB-12345", 
          full_name: "Fathima Rizna", 
          email: "fathima@example.com",
          phone: "0771234567", 
          address: "123 Main St, Kalmunai", 
          nic: "901234567V" 
        },
        isRead: false 
      },
      { 
        id: "n2", 
        type: "new_registration", 
        title: "New Registration", 
        message: "Mohamed Rifan has registered through online portal", 
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        user: { 
          id: "p2", 
          qr_code: "DSPUB-23456", 
          full_name: "Mohamed Rifan", 
          email: "mohamed@example.com",
          phone: "0772345678", 
          address: "456 Oak St, Kalmunai", 
          nic: "912345678V" 
        },
        isRead: true 
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  // Function to handle adding a new public user
  const onAddPublicUser = async (data: PublicUserFormData) => {
    try {
      const qrCode = `DSPUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const newUser = await userService.createUser({
        ...data,
        qr_code: qrCode,
        role: 'public'
      });
      
      if (newUser) {
        setIsAddUserModalOpen(false);
        publicUserForm.reset();
        // Refresh the users list immediately
        fetchPublicUsers();
        toast.success('User created successfully');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  // Function to handle editing a public user
  const onEditPublicUser = async (data: PublicUserFormData) => {
    try {
      if (!selectedUser?.id) {
        toast.error('No user selected for editing');
        return;
      }

      const updatedUser = await userService.updateUser(selectedUser.id, data);
      
      if (updatedUser) {
        setIsEditUserModalOpen(false);
        editUserForm.reset();
        // Refresh the users list immediately
        fetchPublicUsers();
        toast.success('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  // Function to open edit modal with user data
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    editUserForm.reset({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      nic: user.nic,
    });
    setIsEditUserModalOpen(true);
  };

  // Function to view the ID card
  const handleViewIdCard = (user: User) => {
    setSelectedUser(user);
    setIsViewIdCardModalOpen(true);
  };

  // Function to mark notification as read and create ID card
  const handleNotificationAction = (notification: Notification) => {
    if (notification.type === "new_registration") {
      // Mark as read (would normally update in database)
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? {...n, isRead: true} : n)
      );
      
      // View the ID card for this user
      handleViewIdCard(notification.user);
    }
  };

  // Function to handle scanning a QR code
  const handleScanQrCode = () => {
    // Here you would normally open a QR code scanner
    toast.info("QR code scanner functionality would open here");
  };

  // Function to navigate to employee dashboard
  const handleOfficeButtonClick = () => {
    navigate("/dashboard/employee");
  };

  // Function to fetch public users
  const fetchPublicUsers = async () => {
    try {
      const users = await userService.getAllUsers();
      // Need to make sure we filter to only public users that match our User interface
      const filteredUsers = users.filter(user => user.role === 'public' && 
        'full_name' in user && 'email' in user && 'qr_code' in user);
      setPublicUsers(filteredUsers as User[]);
    } catch (error) {
      console.error('Error fetching public users:', error);
      toast.error('Failed to fetch public users');
    }
  };

  useEffect(() => {
    fetchPublicUsers();
  }, []);

  // Function to handle deleting a user
  const handleDeleteUser = async (userId: string) => {
    try {
      const success = await userService.deleteUser(userId);
      if (success) {
        // Refresh the users list immediately
        fetchPublicUsers();
        toast.success('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Filter users based on search term
  const filteredUsers = publicUsers.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.qr_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  // Format notification time
  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 24 * 60) {
      return `${Math.floor(diffMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">Public User Management</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Notification Component */}
          <UserNotifications 
            notifications={notifications} 
            onNotificationAction={handleNotificationAction} 
            formatNotificationTime={formatNotificationTime}
          />
          
          {/* Action Buttons */}
          <ActionButtons 
            onScanQrCode={handleScanQrCode}
            onOfficeButtonClick={handleOfficeButtonClick}
            onAddUserClick={() => setIsAddUserModalOpen(true)}
          />
        </div>
      </div>

      {/* Search Bar */}
      <UserSearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* Users Table */}
      <UsersTable 
        users={filteredUsers} 
        onEditUser={handleEditUser} 
        onViewIdCard={handleViewIdCard}
        onDeleteUser={handleDeleteUser}
      />

      {/* Add User Modal */}
      <AddUserModal 
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        form={publicUserForm}
        onSubmit={onAddPublicUser}
      />

      {/* Edit User Modal */}
      <EditUserModal 
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        form={editUserForm}
        onSubmit={onEditPublicUser}
      />

      {/* ID Card Modal */}
      <IdCardModal 
        open={isViewIdCardModalOpen}
        onOpenChange={setIsViewIdCardModalOpen}
        user={selectedUser}
      />
    </div>
  );
};

export default PublicUserManagement;
