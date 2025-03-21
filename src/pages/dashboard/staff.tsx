
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Building2, 
  Settings, 
  BarChart3, 
  UserPlus,
  QrCode,
  Scan,
  IdCard,
  Briefcase
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import QRCode from "qrcode.react";

// Placeholder component for stats
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Public Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">
            +24 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <UserPlus className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">
            -3 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ID Cards Generated</CardTitle>
          <IdCard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">289</div>
          <p className="text-xs text-muted-foreground">
            +15 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Services Provided</CardTitle>
          <Building2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">
            +32 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Public user management component
const PublicUserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isIDCardModalOpen, setIsIDCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // User form schema
  const userFormSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  });

  // Form for adding a new user
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  // Edit user form
  const editUserForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  // Generate a unique QR code
  const generateQRCode = () => {
    return "PU" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  // Function to handle adding a new user
  const onAddUser = (data: z.infer<typeof userFormSchema>) => {
    const qrCode = generateQRCode();
    const newUser = {
      public_user_id: "pub_" + Date.now().toString(),
      qr_code: qrCode,
      ...data
    };
    
    console.log("Adding public user:", newUser);
    // Here you would normally call an API to create the user
    
    // For demo, let's add to our mock data
    setUsers([...users, newUser]);
    
    toast.success("Public user created successfully");
    setIsAddUserModalOpen(false);
    userForm.reset();
  };

  // Function to handle editing a user
  const onEditUser = (data: z.infer<typeof userFormSchema>) => {
    if (!selectedUser) return;
    
    const updatedUser = {
      ...selectedUser,
      ...data
    };
    
    console.log("Editing public user:", updatedUser);
    // Here you would normally call an API to update the user
    
    // For demo, update our mock data
    setUsers(users.map(user => 
      user.public_user_id === selectedUser.public_user_id ? updatedUser : user
    ));
    
    toast.success("Public user updated successfully");
    setIsEditUserModalOpen(false);
    editUserForm.reset();
  };

  // Function to open view modal with user data
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
  };

  // Function to open edit modal with user data
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    editUserForm.reset({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
    });
    setIsEditUserModalOpen(true);
  };

  // Function to open ID card modal
  const handleGenerateIDCard = (user: any) => {
    setSelectedUser(user);
    setIsIDCardModalOpen(true);
  };

  // Function to handle scanning QR code
  const handleScan = () => {
    // In a real app, you would implement a scanning functionality
    // For demo, we'll just show a modal with input
    setIsScanModalOpen(true);
  };

  // Function to handle QR code input
  const handleQRSearch = (qrCode: string) => {
    const user = users.find(user => user.qr_code === qrCode);
    if (user) {
      setSelectedUser(user);
      setIsViewUserModalOpen(true);
      setIsScanModalOpen(false);
    } else {
      toast.error("User not found with this QR code");
    }
  };

  // Mock users data for demonstration
  const [users, setUsers] = useState([
    { 
      public_user_id: "pub_1", 
      qr_code: "PUX123456", 
      full_name: "Ahmed Mohammed", 
      email: "ahmed@example.com", 
      phone: "0776543210" 
    },
    { 
      public_user_id: "pub_2", 
      qr_code: "PUX234567", 
      full_name: "Fatima Zahra", 
      email: "fatima@example.com", 
      phone: "0765432109" 
    },
    { 
      public_user_id: "pub_3", 
      qr_code: "PUX345678", 
      full_name: "Mohammed Ali", 
      email: "mali@example.com", 
      phone: "0754321098" 
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Public User Management</h2>
        <div className="flex gap-2">
          <Button onClick={handleScan} variant="outline" className="bg-secondary text-secondary-foreground">
            <Scan className="h-4 w-4 mr-2" />
            Scan QR
          </Button>
          <Button onClick={() => setIsAddUserModalOpen(true)} className="bg-primary text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Full Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">QR Code</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.public_user_id} className="border-t">
                <td className="px-4 py-3">{user.full_name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.qr_code}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-secondary text-secondary-foreground"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-accent text-accent-foreground"
                      onClick={() => handleGenerateIDCard(user)}
                    >
                      ID Card
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <ModalForm
        title="Add New Public User"
        description="Create a new public user account"
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
      >
        <Form {...userForm}>
          <form onSubmit={userForm.handleSubmit(onAddUser)} className="space-y-4">
            <FormField
              control={userForm.control}
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
              control={userForm.control}
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
              control={userForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" type="tel" {...field} />
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
                  userForm.reset();
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

      {/* View User Modal */}
      <ModalForm
        title="User Details"
        description="View public user information"
        open={isViewUserModalOpen}
        onOpenChange={setIsViewUserModalOpen}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-muted p-3 rounded-lg">
                <QRCode value={selectedUser.qr_code} size={120} />
              </div>
            </div>
            
            <div className="text-center mb-2">
              <div className="text-xs text-muted-foreground">QR Code</div>
              <div className="font-bold">{selectedUser.qr_code}</div>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Full Name:</div>
                <div className="text-sm col-span-2">{selectedUser.full_name}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Email:</div>
                <div className="text-sm col-span-2">{selectedUser.email}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Phone:</div>
                <div className="text-sm col-span-2">{selectedUser.phone}</div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                className="bg-secondary text-secondary-foreground"
                onClick={() => {
                  setIsViewUserModalOpen(false);
                  handleGenerateIDCard(selectedUser);
                }}
              >
                Generate ID Card
              </Button>
              
              <Button 
                onClick={() => {
                  setIsViewUserModalOpen(false);
                  handleEditUser(selectedUser);
                }}
              >
                Edit Details
              </Button>
            </div>
          </div>
        )}
      </ModalForm>

      {/* Edit User Modal */}
      <ModalForm
        title="Edit Public User"
        description="Update public user information"
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
      >
        <Form {...editUserForm}>
          <form onSubmit={editUserForm.handleSubmit(onEditUser)} className="space-y-4">
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
                    <Input placeholder="Enter phone number" type="tel" {...field} />
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

      {/* Scan QR Modal */}
      <ModalForm
        title="Scan QR Code"
        description="Scan or enter QR code to find user"
        open={isScanModalOpen}
        onOpenChange={setIsScanModalOpen}
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <Scan className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Scan QR code or enter manually below</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qr-code">QR Code</Label>
            <div className="flex space-x-2">
              <Input id="qr-code" placeholder="Enter QR code" />
              <Button onClick={() => handleQRSearch("PUX123456")} className="bg-primary text-white">
                Search
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground pt-2">
            <p>For demo purposes, try entering: PUX123456, PUX234567, or PUX345678</p>
          </div>
        </div>
      </ModalForm>

      {/* ID Card Modal */}
      <ModalForm
        title="ID Card Generator"
        description="Generate and download ID card"
        open={isIDCardModalOpen}
        onOpenChange={setIsIDCardModalOpen}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
              <div className="bg-primary text-white p-3 text-center">
                <h3 className="font-bold">DIVISIONAL SECRETARIAT - KALMUNAI</h3>
                <p className="text-xs">PUBLIC IDENTIFICATION CARD</p>
              </div>
              
              <div className="p-4">
                <div className="flex flex-col items-center mb-3">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <UserPlus className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-bold">{selectedUser.full_name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1 text-sm">
                    <span className="font-medium">ID No:</span>
                    <span className="col-span-2">{selectedUser.public_user_id}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 text-sm">
                    <span className="font-medium">Email:</span>
                    <span className="col-span-2">{selectedUser.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 text-sm">
                    <span className="font-medium">Phone:</span>
                    <span className="col-span-2">{selectedUser.phone}</span>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <QRCode value={selectedUser.qr_code} size={80} />
                </div>
                
                <div className="text-center text-xs mt-2">
                  <p>{selectedUser.qr_code}</p>
                </div>
              </div>
              
              <div className="bg-accent text-center p-2 text-xs">
                <p>Issued by the Divisional Secretariat of Kalmunai</p>
                <p>Valid until 31/12/2025</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline">Print ID Card</Button>
              <Button className="bg-primary text-white">Download PDF</Button>
            </div>
          </div>
        )}
      </ModalForm>
    </div>
  );
};

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Public Users", icon: Users, value: "public-users" },
    { label: "Scan QR", icon: Scan, value: "scan-qr" },
    { label: "ID Cards", icon: IdCard, value: "id-cards" },
    { label: "Office", icon: Briefcase, value: "office" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];
  
  // Handle Office button click to navigate to employee dashboard
  const handleOfficeClick = () => {
    navigate("/dashboard/employee");
  };
  
  return (
    <DashboardLayout 
      title="Staff Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage public users and services.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate("#public-users")} className="bg-primary text-white h-auto py-4 flex flex-col">
                  <UserPlus className="h-6 w-6 mb-2" />
                  <span>Add Public User</span>
                </Button>
                <Button onClick={handleOfficeClick} className="bg-secondary text-secondary-foreground h-auto py-4 flex flex-col">
                  <Briefcase className="h-6 w-6 mb-2" />
                  <span>Go to Office</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <Scan className="h-6 w-6 mb-2" />
                  <span>Scan QR Code</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <IdCard className="h-6 w-6 mb-2" />
                  <span>Generate ID</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <UserPlus className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">New user created</p>
                    <p className="text-xs text-muted-foreground">Fatima Zahra - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <IdCard className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">ID card generated</p>
                    <p className="text-xs text-muted-foreground">Ahmed Mohammed - 3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Scan className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">User verified via QR</p>
                    <p className="text-xs text-muted-foreground">Mohammed Ali - 5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="public-users" className="space-y-6 mt-2">
        <PublicUserManagement />
      </TabsContent>
      
      <TabsContent value="scan-qr" className="space-y-6 mt-2">
        <div className="grid place-items-center py-10">
          <div className="text-center max-w-md">
            <Scan className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
            <p className="text-muted-foreground mb-8">Scan a public user's QR code to quickly access their profile and service history.</p>
            
            <div className="border-2 border-dashed rounded-lg p-10 flex items-center justify-center bg-muted/20 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Point camera at QR code</p>
              </div>
            </div>
            
            <Button onClick={() => handleQRSearch("PUX123456")} className="bg-primary text-white w-full py-2">
              <Scan className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
            
            <div className="mt-4">
              <p className="text-sm">Or enter QR code manually</p>
              <div className="flex mt-2">
                <Input placeholder="Enter QR code" className="mr-2" />
                <Button className="bg-primary text-white">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="id-cards" className="space-y-6 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">ID Card Management</h2>
          <Button className="bg-primary text-white">
            <IdCard className="h-4 w-4 mr-2" />
            Generate New ID Card
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.public_user_id} className="glass-card overflow-hidden">
              <div className="bg-primary text-white p-2 text-center text-sm">
                <h3>PUBLIC ID CARD</h3>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col items-center mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-sm">{user.full_name}</h3>
                </div>
                
                <div className="flex justify-center mb-3">
                  <QRCode value={user.qr_code} size={80} />
                </div>
                
                <div className="text-xs text-center">
                  <p>{user.qr_code}</p>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleGenerateIDCard(user)}
                  >
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-primary text-white text-xs"
                  >
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="office" className="space-y-6 mt-2">
        <div className="grid place-items-center py-10">
          <div className="text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Office Portal</h2>
            <p className="text-muted-foreground mb-8 max-w-md">Access office functions including leave management and departmental tasks.</p>
            <Button 
              onClick={handleOfficeClick}
              className="bg-primary text-white px-8 py-2"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Go to Office Dashboard
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6 mt-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={user?.username} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value="Land Administration" readOnly />
              </div>
              <Button className="bg-primary text-white mt-4">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default StaffDashboard;
