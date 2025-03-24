
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Users, 
  ClipboardList, 
  QrCode, 
  BarChart3, 
  UserPlus,
  UserSearch,
  Printer,
  Building,
  Download,
  Scan,
  FileText,
  Search,
  Eye,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Placeholder stats component
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Public Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">384</div>
          <p className="text-xs text-muted-foreground">
            +42 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ID Cards Generated</CardTitle>
          <QrCode className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">298</div>
          <p className="text-xs text-muted-foreground">
            +36 this month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <ClipboardList className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            -8 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forms Processed</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground">
            +21 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Public user management component
const PublicUserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isViewIdCardModalOpen, setIsViewIdCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const navigate = useNavigate();

  // Public user form schema
  const publicUserFormSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number must be at least 8 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    nic: z.string().min(10, "NIC must be at least 10 characters"),
  });

  // Form for adding a new public user
  const publicUserForm = useForm<z.infer<typeof publicUserFormSchema>>({
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
  const editUserForm = useForm<z.infer<typeof publicUserFormSchema>>({
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
  const onAddPublicUser = (data: z.infer<typeof publicUserFormSchema>) => {
    console.log("Adding public user:", data);
    // Generate a unique QR code for the user
    const qrCode = `DSPUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // Here you would normally call an API to create the user
    toast.success("Public user created successfully");
    setIsAddUserModalOpen(false);
    publicUserForm.reset();
  };

  // Function to handle editing a public user
  const onEditPublicUser = (data: z.infer<typeof publicUserFormSchema>) => {
    console.log("Editing public user:", data);
    // Here you would normally call an API to update the user
    toast.success("Public user updated successfully");
    setIsEditUserModalOpen(false);
    editUserForm.reset();
  };

  // Function to open edit modal with user data
  const handleEditUser = (user: any) => {
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
  const handleViewIdCard = (user: any) => {
    setSelectedUser(user);
    setIsViewIdCardModalOpen(true);
  };

  // Function to mark notification as read and create ID card
  const handleNotificationAction = (notification: any) => {
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

  // Mock public users data for demonstration
  const publicUsers = [
    { id: "p1", qr_code: "DSPUB-12345", full_name: "Fathima Rizna", email: "fathima@example.com", phone: "0771234567", address: "123 Main St, Kalmunai", nic: "901234567V" },
    { id: "p2", qr_code: "DSPUB-23456", full_name: "Mohamed Rifan", email: "mohamed@example.com", phone: "0772345678", address: "456 Oak St, Kalmunai", nic: "912345678V" },
    { id: "p3", qr_code: "DSPUB-34567", full_name: "Suhail Ahmed", email: "suhail@example.com", phone: "0773456789", address: "789 Pine St, Kalmunai", nic: "923456789V" }
  ];

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

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">Public User Management</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 relative"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {unreadNotificationsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadNotificationsCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Recent Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                <DropdownMenuGroup>
                  {notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className="flex flex-col items-start py-2 px-4 cursor-pointer"
                      onClick={() => handleNotificationAction(notification)}
                    >
                      <div className="flex w-full justify-between items-start">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatNotificationTime(notification.timestamp)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{notification.message}</span>
                      <div className="w-full flex justify-end mt-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs text-primary"
                        >
                          Create ID Card
                        </Button>
                      </div>
                      {!notification.isRead && (
                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              ) : (
                <div className="py-3 px-4 text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            onClick={handleScanQrCode} 
            variant="outline"
            className="bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20"
          >
            <Scan className="h-4 w-4 mr-2" />
            Scan QR
          </Button>
          <Button 
            onClick={handleOfficeButtonClick} 
            variant="outline"
            className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
          >
            <Building className="h-4 w-4 mr-2" />
            Office
          </Button>
          <Button 
            onClick={() => setIsAddUserModalOpen(true)} 
            className="bg-primary text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, QR code or phone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
            {filteredUsers.map((user) => (
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
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewIdCard(user)}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Public User Modal */}
      <ModalForm
        title="Add New Public User"
        description="Create a new public user account"
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
      >
        <Form {...publicUserForm}>
          <form onSubmit={publicUserForm.handleSubmit(onAddPublicUser)} className="space-y-4">
            <FormField
              control={publicUserForm.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={publicUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={publicUserForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={publicUserForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={publicUserForm.control}
              name="nic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIC Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter NIC number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddUserModalOpen(false);
                  publicUserForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Add User
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>

      {/* Edit Public User Modal */}
      <ModalForm
        title="Edit Public User"
        description="Update public user information"
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
      >
        <Form {...editUserForm}>
          <form onSubmit={editUserForm.handleSubmit(onEditPublicUser)} className="space-y-4">
            <FormField
              control={editUserForm.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="nic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIC Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter NIC number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditUserModalOpen(false);
                  editUserForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Update User
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>

      {/* View ID Card Modal */}
      <ModalForm
        title="ID Card Preview"
        description="Print or download the ID card"
        open={isViewIdCardModalOpen}
        onOpenChange={setIsViewIdCardModalOpen}
      >
        {selectedUser && (
          <div className="space-y-4">
            {/* Updated professional ID card design */}
            <div className="relative mx-auto w-full max-w-[360px] h-[220px] rounded-xl overflow-hidden border-2 border-black/10 shadow-lg">
              {/* Card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-flower-darkBlue via-flower-mediumBlue to-flower-teal"></div>
              
              {/* Card security pattern - fixed SVG encoding */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"></div>
              
              {/* Security hologram effect */}
              <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-transparent border border-white/20"></div>

              {/* Left side - Photo */}
              <div className="absolute top-0 left-0 h-full w-1/3 p-4 flex flex-col justify-between items-center">
                <div className="w-full">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/50">
                    <UserSearch className="h-12 w-12 text-flower-darkBlue" />
                  </div>
                </div>
                
                <div className="w-full">
                  <QRCodeSVG
                    value={selectedUser.qr_code}
                    size={75}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              </div>
              
              {/* Right side - Information */}
              <div className="absolute top-0 right-0 h-full w-2/3 p-4 flex flex-col justify-between">
                {/* Header */}
                <div className="text-center text-white">
                  <h3 className="font-bold text-sm uppercase tracking-wider">Democratic Socialist Republic of Sri Lanka</h3>
                  <h4 className="font-semibold text-xs">Divisional Secretariat - Kalmunai</h4>
                  <div className="mt-1 bg-white/20 py-0.5 px-2 rounded text-xs font-medium inline-block">
                    OFFICIAL ID
                  </div>
                </div>
                
                {/* User details */}
                <div className="text-white space-y-0.5">
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold">Name:</span>
                    <span className="col-span-2 font-medium truncate">{selectedUser.full_name}</span>
                  </div>
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold">NIC:</span>
                    <span className="col-span-2">{selectedUser.nic}</span>
                  </div>
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold">Address:</span>
                    <span className="col-span-2 truncate">{selectedUser.address}</span>
                  </div>
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold">Contact:</span>
                    <span className="col-span-2">{selectedUser.phone}</span>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="text-white text-center text-xxs">
                  <p className="text-[8px] opacity-80">ID: {selectedUser.qr_code}</p>
                  <p className="text-[7px] opacity-70">This card is property of Divisional Secretariat Kalmunai. If found, please return.</p>
                </div>
              </div>
            </div>
            
            {/* Card actions */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  // Handle print functionality
                  window.print();
                }}
                className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button 
                className="bg-primary text-white"
                onClick={() => {
                  // Handle download functionality
                  toast.success("ID Card downloaded successfully");
                  setIsViewIdCardModalOpen(false);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </ModalForm>
    </div>
  );
};

// Scan QR Code component
const ScanQrCode = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">QR Code Scanner</h2>
      
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-6 py-10">
            <div className="w-64 h-64 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center bg-white/50">
              <Scan className="h-16 w-16 text-primary/30" />
            </div>
            <p className="text-center text-muted-foreground">
              Position the QR code within the scanner area.<br />
              The public user details will appear automatically.
            </p>
            <Button className="bg-primary text-white">
              <Scan className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Public Users", icon: Users, value: "users" },
    { label: "Scan QR", icon: Scan, value: "scan" },
  ];
  
  return (
    <DashboardLayout 
      title="Staff Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage public users and services.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6 mt-2">
        <PublicUserManagement />
      </TabsContent>
      
      <TabsContent value="scan" className="space-y-6 mt-2">
        <ScanQrCode />
      </TabsContent>
    </DashboardLayout>
  );
};

export default StaffDashboard;
