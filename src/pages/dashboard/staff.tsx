
import { useState } from "react";
import { useAuth } from "@/auth/auth-context";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  QrCode, 
  FileText, 
  Settings, 
  Clock,
  Building,
  Download,
  Printer,
  UserPlus,
  CreditCard,
  Scan
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import QRCode from "qrcode.react";

// Mock function to generate a unique QR code ID
const generateQRCodeId = () => {
  return `KAL-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Placeholder component for stats
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">36</div>
          <p className="text-xs text-muted-foreground">
            12 require urgent attention
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registered Citizens</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">842</div>
          <p className="text-xs text-muted-foreground">
            +76 new this month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ID Cards Issued</CardTitle>
          <CreditCard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">753</div>
          <p className="text-xs text-muted-foreground">
            +32 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Services Requested</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">496</div>
          <p className="text-xs text-muted-foreground">
            +118 this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Public account management component
const PublicAccountsManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewCardOpen, setIsViewCardOpen] = useState(false);
  
  // Generate a QR code for a new user
  const [qrCode, setQrCode] = useState('');
  
  // Create a schema for the public user form
  const publicUserSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  });
  
  // Initialize the form
  const publicUserForm = useForm<z.infer<typeof publicUserSchema>>({
    resolver: zodResolver(publicUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });
  
  // Function to handle adding a new public user
  const onAddPublicUser = (data: z.infer<typeof publicUserSchema>) => {
    const qrCodeId = generateQRCodeId();
    console.log("Adding public user:", { ...data, qr_code: qrCodeId });
    toast.success("Public user created successfully");
    setIsAddUserModalOpen(false);
    publicUserForm.reset();
  };
  
  // Function to view ID card for a user
  const viewIdCard = (user: any) => {
    setSelectedUser(user);
    setQrCode(user.qr_code);
    setIsViewCardOpen(true);
  };
  
  // Mock public users data
  const publicUsers = [
    { id: "p1", qr_code: "KAL-123456", full_name: "John Doe", email: "john.doe@example.com", phone: "0771234567" },
    { id: "p2", qr_code: "KAL-789012", full_name: "Jane Smith", email: "jane.smith@example.com", phone: "0779876543" },
    { id: "p3", qr_code: "KAL-345678", full_name: "Ahmed Khan", email: "ahmed.khan@example.com", phone: "0761122334" },
    { id: "p4", qr_code: "KAL-901234", full_name: "Priya Kumar", email: "priya.kumar@example.com", phone: "0755566778" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Public Account Management</h2>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Scan className="h-4 w-4 mr-2" />
            Scan QR Code
          </Button>
          <Button onClick={() => setIsAddUserModalOpen(true)} className="bg-primary text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Citizen
          </Button>
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
            {publicUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.qr_code}</td>
                <td className="px-4 py-3">{user.full_name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => viewIdCard(user)}>
                      <CreditCard className="h-3 w-3 mr-1" />
                      ID Card
                    </Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Public User Modal */}
      <ModalForm
        title="Register New Citizen"
        description="Create a new citizen account"
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
                Register Citizen
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
      
      {/* View ID Card Modal */}
      <ModalForm
        title="Citizen ID Card"
        open={isViewCardOpen}
        onOpenChange={setIsViewCardOpen}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex flex-col items-center">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-bold">Republic of Sri Lanka</h3>
                  <p className="text-sm">Divisional Secretariat - Kalmunai</p>
                </div>
                
                <div className="mb-3">
                  <QRCode value={selectedUser.qr_code} size={120} />
                </div>
                
                <div className="text-center space-y-1 w-full">
                  <h4 className="font-bold">{selectedUser.full_name}</h4>
                  <p className="text-sm">ID: {selectedUser.qr_code}</p>
                  <p className="text-sm">Email: {selectedUser.email}</p>
                  <p className="text-sm">Phone: {selectedUser.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button className="bg-primary text-white">
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

// QR Code scanner component
const QRScanner = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">QR Code Scanner</h2>
      </div>
      
      <Card className="glass-card p-6">
        <div className="text-center py-8">
          <Scan className="h-16 w-16 mx-auto mb-4 text-primary/40" />
          <h2 className="text-xl font-medium mb-4">Scan Citizen ID</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Use the camera to scan a citizen's QR code to view their details and provide services.
          </p>
          <Button className="bg-primary text-white">
            <Scan className="h-4 w-4 mr-2" />
            Start Scanning
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Department forms component
const DepartmentForms = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Department Forms</h2>
        <Button className="bg-primary text-white">
          <FileText className="h-4 w-4 mr-2" />
          Add New Form
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Birth Certificate", "Death Certificate", "Marriage Certificate", "ID Card Application"].map((form, index) => (
          <Card key={index} className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{form}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                {index + 8} fields • {index + 12} submissions this month
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Edit Form</Button>
                <Button variant="outline" size="sm">View Submissions</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: Clock, value: "overview" },
    { label: "Public Accounts", icon: Users, value: "public-accounts" },
    { label: "QR Scanner", icon: Scan, value: "qr-scanner" },
    { label: "Department Forms", icon: FileText, value: "department-forms" },
    { label: "Employee Portal", icon: Building, value: "employee" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];
  
  return (
    <DashboardLayout 
      title="Staff Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage public accounts and services.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium">Application #{10548 + index}</h3>
                      <p className="text-sm text-muted-foreground">
                        {["Birth Certificate", "ID Card", "Land Title", "Marriage Certificate", "Death Certificate"][index]}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>ID Card Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium">Citizen {index + 1}</h3>
                      <p className="text-sm text-muted-foreground">
                        Requested: {["New", "Replacement", "Update", "New"][index]} ID Card
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Generate ID</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="public-accounts" className="space-y-6 mt-2">
        <PublicAccountsManagement />
      </TabsContent>
      
      <TabsContent value="qr-scanner" className="space-y-6 mt-2">
        <QRScanner />
      </TabsContent>
      
      <TabsContent value="department-forms" className="space-y-6 mt-2">
        <DepartmentForms />
      </TabsContent>
      
      <TabsContent value="employee" className="space-y-6 mt-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Employee Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Building className="h-12 w-12 mx-auto mb-4 text-primary/40" />
              <h2 className="text-xl font-medium mb-2">Access the Employee Dashboard</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Manage your personal profile, request leave, and access other employee services.
              </p>
              <Button onClick={() => navigate("/dashboard/employee")} className="bg-primary text-white">
                Go to Employee Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6 mt-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">Update your personal details</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Update your password</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default StaffDashboard;
