
import { useState } from "react";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  FileText, 
  User, 
  MessageCircle, 
  CreditCard,
  Clock,
  Download,
  History,
  Settings,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import QRCode from "qrcode.react";

// Stats Grid component
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Requests</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4</div>
          <p className="text-xs text-muted-foreground">
            2 pending, 2 completed
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessageCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            1 unread message
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forms</CardTitle>
          <Download className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">
            Available to download
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payments</CardTitle>
          <CreditCard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹0</div>
          <p className="text-xs text-muted-foreground">
            No pending payments
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Service Requests component
const ServiceRequests = () => {
  const { user } = useAuth();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isViewRequestModalOpen, setIsViewRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // Service request schema
  const requestFormSchema = z.object({
    service_id: z.string().min(1, "Service is required"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    contact_number: z.string().min(10, "Contact number must be at least 10 digits"),
  });
  
  // Form for requesting a service
  const requestForm = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      service_id: "",
      description: "",
      contact_number: "",
    },
  });
  
  // Function to handle service request
  const onRequestService = (data: z.infer<typeof requestFormSchema>) => {
    const newRequest = {
      request_id: "req_" + Date.now().toString(),
      public_user_id: user?.id || "",
      service_id: data.service_id,
      service_name: services.find(s => s.id === data.service_id)?.name || "",
      description: data.description,
      contact_number: data.contact_number,
      status: "Pending",
      submitted_date: new Date(),
    };
    
    console.log("Requesting service:", newRequest);
    
    // For demo, add to our mock data
    setServiceRequests([...serviceRequests, newRequest]);
    
    toast.success("Service request submitted successfully");
    setIsRequestModalOpen(false);
    requestForm.reset();
  };
  
  // Function to view request details
  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewRequestModalOpen(true);
  };
  
  // Mock services data
  const services = [
    { id: "serv1", name: "Birth Certificate" },
    { id: "serv2", name: "Marriage Certificate" },
    { id: "serv3", name: "Land Title" },
    { id: "serv4", name: "Financial Aid" },
    { id: "serv5", name: "ID Card Renewal" },
  ];
  
  // Mock service requests data
  const [serviceRequests, setServiceRequests] = useState([
    {
      request_id: "req_1",
      public_user_id: "pub_1",
      service_id: "serv1",
      service_name: "Birth Certificate",
      description: "Request for new birth certificate",
      contact_number: "0776543210",
      status: "Completed",
      submitted_date: new Date(2023, 5, 15),
      completed_date: new Date(2023, 5, 20),
    },
    {
      request_id: "req_2",
      public_user_id: "pub_1",
      service_id: "serv3",
      service_name: "Land Title",
      description: "Request for land title verification",
      contact_number: "0776543210",
      status: "Processing",
      submitted_date: new Date(2023, 7, 10),
    },
    {
      request_id: "req_3",
      public_user_id: "pub_1",
      service_id: "serv2",
      service_name: "Marriage Certificate",
      description: "Request for copy of marriage certificate",
      contact_number: "0776543210",
      status: "Pending",
      submitted_date: new Date(2023, 8, 5),
    },
    {
      request_id: "req_4",
      public_user_id: "pub_1",
      service_id: "serv4",
      service_name: "Financial Aid",
      description: "Application for financial assistance program",
      contact_number: "0776543210",
      status: "Completed",
      submitted_date: new Date(2023, 6, 1),
      completed_date: new Date(2023, 6, 15),
    },
  ]);
  
  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600";
      case "Processing":
        return "bg-blue-500 hover:bg-blue-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Service Requests</h2>
        <Button onClick={() => setIsRequestModalOpen(true)} className="bg-primary text-white">
          <FileText className="h-4 w-4 mr-2" />
          Request Service
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-yellow-100 p-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="font-medium">Pending</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-blue-100 p-3 mb-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium">Processing</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium">Completed</h3>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-3 mb-2">
              <History className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium">Total</h3>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Service Requests Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Service</th>
              <th className="px-4 py-3 text-left font-medium">Submitted</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request.request_id} className="border-t">
                <td className="px-4 py-3">{request.service_name}</td>
                <td className="px-4 py-3">{format(request.submitted_date, "MMM dd, yyyy")}</td>
                <td className="px-4 py-3">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewRequest(request)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Request Service Modal */}
      <ModalForm
        title="Request Service"
        description="Submit a new service request"
        open={isRequestModalOpen}
        onOpenChange={setIsRequestModalOpen}
      >
        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(onRequestService)} className="space-y-4">
            <FormField
              control={requestForm.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={requestForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about your request"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={requestForm.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
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
                  setIsRequestModalOpen(false);
                  requestForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
      
      {/* View Request Modal */}
      <ModalForm
        title="Service Request Details"
        description="View details of your service request"
        open={isViewRequestModalOpen}
        onOpenChange={setIsViewRequestModalOpen}
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <Badge className={`${getStatusColor(selectedRequest.status)} px-4 py-2 text-base`}>
                {selectedRequest.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Service:</div>
                <div className="text-sm col-span-2">{selectedRequest.service_name}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Submitted On:</div>
                <div className="text-sm col-span-2">{format(selectedRequest.submitted_date, "MMM dd, yyyy")}</div>
              </div>
              
              {selectedRequest.completed_date && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b">
                  <div className="text-sm font-medium">Completed On:</div>
                  <div className="text-sm col-span-2">{format(selectedRequest.completed_date, "MMM dd, yyyy")}</div>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Description:</div>
                <div className="text-sm col-span-2">{selectedRequest.description}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Contact:</div>
                <div className="text-sm col-span-2">{selectedRequest.contact_number}</div>
              </div>
            </div>
            
            {selectedRequest.status === "Completed" && (
              <div className="border p-4 rounded-lg bg-green-50 text-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Your request has been completed</p>
                <p className="text-xs text-green-700 mt-1">You can collect any documents at the Divisional Secretariat office</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                onClick={() => setIsViewRequestModalOpen(false)}
                className="bg-primary text-white"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </ModalForm>
    </div>
  );
};

// User Profile component
const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  
  // Profile form schema
  const profileFormSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  });
  
  // Form for editing profile
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "Ahmed Mohammed",
      email: user?.email || "ahmed@example.com",
      phone: "0776543210",
      address: "15 Main Street, Kalmunai",
    },
  });
  
  // Function to handle profile update
  const onUpdateProfile = (data: z.infer<typeof profileFormSchema>) => {
    console.log("Updating profile:", data);
    toast.success("Profile updated successfully");
    setIsEditProfileModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Profile</h2>
        <Button onClick={() => setIsEditProfileModalOpen(true)} className="bg-primary text-white">
          <Settings className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="glass-card md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-secondary" />
            </div>
            
            <h2 className="text-xl font-bold">Ahmed Mohammed</h2>
            <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
            
            <div className="w-full mt-2">
              <div className="text-center p-3 bg-accent/10 rounded-lg mb-4">
                <QRCode value="PUX123456" size={120} className="mx-auto mb-2" />
                <p className="text-xs font-medium">PUX123456</p>
                <p className="text-xs text-muted-foreground">Your Public ID</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Info */}
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <div className="font-medium">Full Name:</div>
              <div className="col-span-2">Ahmed Mohammed</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <div className="font-medium">Email:</div>
              <div className="col-span-2">{user?.email || "ahmed@example.com"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <div className="font-medium">Phone:</div>
              <div className="col-span-2">0776543210</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <div className="font-medium">Address:</div>
              <div className="col-span-2">15 Main Street, Kalmunai</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <div className="font-medium">Account Created:</div>
              <div className="col-span-2">January 15, 2023</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2">
              <div className="font-medium">Last Login:</div>
              <div className="col-span-2">Today, 10:30 AM</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity History */}
        <Card className="glass-card md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Requested Birth Certificate</p>
                  <p className="text-xs text-muted-foreground">September 5, 2023 - 2:34 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Download className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Downloaded Land Application Form</p>
                  <p className="text-xs text-muted-foreground">August 20, 2023 - 11:15 AM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Received message from Land Department</p>
                  <p className="text-xs text-muted-foreground">August 15, 2023 - 3:45 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Land Title request completed</p>
                  <p className="text-xs text-muted-foreground">July 28, 2023 - 9:20 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Profile Modal */}
      <ModalForm
        title="Edit Profile"
        description="Update your personal information"
        open={isEditProfileModalOpen}
        onOpenChange={setIsEditProfileModalOpen}
      >
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
            <FormField
              control={profileForm.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={profileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={profileForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditProfileModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
    </div>
  );
};

// Forms component
const FormsDownload = () => {
  // Mock forms data
  const forms = [
    {
      id: "form1",
      name: "Birth Certificate Application",
      department: "Civil Registry",
      fileType: "PDF",
      size: "250 KB",
      lastUpdated: "2023-05-15",
    },
    {
      id: "form2",
      name: "Marriage Certificate Application",
      department: "Civil Registry",
      fileType: "PDF",
      size: "320 KB",
      lastUpdated: "2023-06-10",
    },
    {
      id: "form3",
      name: "Land Title Transfer Form",
      department: "Land Administration",
      fileType: "PDF",
      size: "450 KB",
      lastUpdated: "2023-07-22",
    },
    {
      id: "form4",
      name: "Financial Aid Application",
      department: "Social Services",
      fileType: "PDF",
      size: "380 KB",
      lastUpdated: "2023-08-05",
    },
    {
      id: "form5",
      name: "ID Card Renewal Form",
      department: "Administration",
      fileType: "PDF",
      size: "290 KB",
      lastUpdated: "2023-09-12",
    },
  ];
  
  // Function to handle form download
  const handleDownload = (formId: string) => {
    const form = forms.find(f => f.id === formId);
    toast.success(`Downloading ${form?.name}`);
    // In a real app, this would trigger an actual download
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Forms</h2>
        <div className="relative">
          <Input placeholder="Search forms..." className="pr-8" />
          <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Form Name</th>
              <th className="px-4 py-3 text-left font-medium">Department</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Size</th>
              <th className="px-4 py-3 text-left font-medium">Last Updated</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="px-4 py-3">{form.name}</td>
                <td className="px-4 py-3">{form.department}</td>
                <td className="px-4 py-3">{form.fileType}</td>
                <td className="px-4 py-3">{form.size}</td>
                <td className="px-4 py-3">{form.lastUpdated}</td>
                <td className="px-4 py-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(form.id)}
                    className="bg-secondary text-secondary-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Messages component
const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  // Mock messages data
  const messages = [
    {
      id: "msg1",
      sender: "Land Department",
      subject: "Land Title Processing Update",
      content: "Dear Ahmed,\n\nWe are writing to inform you that your land title application has been processed and is now ready for collection. Please visit our office with your identification documents to collect your land title certificate.\n\nRegards,\nLand Department",
      date: new Date(2023, 8, 15, 10, 30),
      read: false,
    },
    {
      id: "msg2",
      sender: "Civil Registry",
      subject: "Birth Certificate Request Completed",
      content: "Dear Ahmed,\n\nThis is to inform you that your request for a birth certificate has been completed. You can collect the certificate from our office during working hours.\n\nThank you for using our services.\n\nBest regards,\nCivil Registry Team",
      date: new Date(2023, 8, 10, 14, 45),
      read: true,
    },
    {
      id: "msg3",
      sender: "Financial Services",
      subject: "Application Status: Financial Aid",
      content: "Dear Ahmed,\n\nWe have reviewed your application for financial aid. Additional documents are required to process your application further. Please submit the following:\n\n1. Proof of income\n2. Bank statements for the last 3 months\n3. Utility bills\n\nPlease submit these documents within 14 days.\n\nRegards,\nFinancial Services Department",
      date: new Date(2023, 7, 25, 9, 15),
      read: true,
    },
  ];
  
  // Set first message as selected by default
  useState(() => {
    if (messages.length > 0 && !selectedMessage) {
      setSelectedMessage(messages[0]);
    }
  });
  
  // Function to view message
  const handleSelectMessage = (message: any) => {
    setSelectedMessage(message);
    // In a real app, would mark as read here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Messages</h2>
        <Button className="bg-primary text-white">
          <MessageCircle className="h-4 w-4 mr-2" />
          Compose Message
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* Message List */}
          <div className="border-r overflow-y-auto">
            <div className="p-3 border-b bg-muted font-medium">Inbox (3)</div>
            <div className="divide-y">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-3 cursor-pointer hover:bg-accent/10 ${
                    selectedMessage?.id === message.id ? 'bg-accent/10 border-l-4 border-primary' : ''
                  } ${!message.read ? 'font-medium' : ''}`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex items-center justify-between">
                    <p className={`${!message.read ? 'font-medium' : ''}`}>{message.sender}</p>
                    <p className="text-xs text-muted-foreground">{format(message.date, "MMM d")}</p>
                  </div>
                  <p className="text-sm truncate">{message.subject}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Content */}
          <div className="col-span-2 flex flex-col">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b">
                  <h3 className="font-bold">{selectedMessage.subject}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span>From: {selectedMessage.sender}</span>
                    <span className="mx-2">•</span>
                    <span>{format(selectedMessage.date, "MMM d, yyyy h:mm a")}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                  <p className="whitespace-pre-line">{selectedMessage.content}</p>
                </div>
                <div className="p-4 border-t flex justify-end space-x-2">
                  <Button variant="outline">Reply</Button>
                  <Button variant="outline">Forward</Button>
                  <Button variant="outline" className="text-destructive">Delete</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Payments component
const Payments = () => {
  // Mock payment history
  const paymentHistory = [
    {
      id: "pay1",
      service: "Birth Certificate",
      amount: 250,
      date: new Date(2023, 6, 15),
      status: "Paid",
    },
    {
      id: "pay2",
      service: "Land Title Processing",
      amount: 1500,
      date: new Date(2023, 5, 10),
      status: "Paid",
    },
    {
      id: "pay3",
      service: "Marriage Certificate",
      amount: 350,
      date: new Date(2023, 3, 22),
      status: "Paid",
    },
  ];
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500 hover:bg-green-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Failed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Payments</h2>
        <Button className="bg-primary text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>
      
      {/* No Pending Payments Card */}
      <Card className="glass-card">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Pending Payments</h3>
          <p className="text-muted-foreground text-center max-w-md">
            You don't have any pending payments at the moment. Your payment history is shown below.
          </p>
        </CardContent>
      </Card>
      
      {/* Payment History */}
      <div>
        <h3 className="text-lg font-medium mb-4">Payment History</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="px-4 py-3">{payment.service}</td>
                  <td className="px-4 py-3">₹{payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">{format(payment.date, "MMM dd, yyyy")}</td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main public dashboard component
const PublicDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Service Requests", icon: FileText, value: "services" },
    { label: "My Profile", icon: User, value: "profile" },
    { label: "Forms", icon: Download, value: "forms" },
    { label: "Messages", icon: MessageCircle, value: "messages" },
    { label: "Payments", icon: CreditCard, value: "payments" },
  ];
  
  return (
    <DashboardLayout 
      title="Public Dashboard" 
      subtitle={`Welcome, ${user?.username}. Access government services from here.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Service Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Marriage Certificate</p>
                  <p className="text-xs text-muted-foreground">Sept 5, 2023</p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Land Title</p>
                  <p className="text-xs text-muted-foreground">Aug 10, 2023</p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Birth Certificate</p>
                  <p className="text-xs text-muted-foreground">June 15, 2023</p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">View All Requests</Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Land Title Processing Update</p>
                  <p className="text-xs text-muted-foreground">Land Department - Sept 15, 2023</p>
                </div>
                <Badge variant="outline">New</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Birth Certificate Request Completed</p>
                  <p className="text-xs text-muted-foreground">Civil Registry - Sept 10, 2023</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application Status: Financial Aid</p>
                  <p className="text-xs text-muted-foreground">Financial Services - Aug 25, 2023</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">View All Messages</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-auto py-6 flex flex-col bg-primary text-white">
                <FileText className="h-8 w-8 mb-2" />
                <span>Request Services</span>
              </Button>
              <Button className="h-auto py-6 flex flex-col bg-secondary text-secondary-foreground">
                <Download className="h-8 w-8 mb-2" />
                <span>Download Forms</span>
              </Button>
              <Button className="h-auto py-6 flex flex-col bg-accent text-accent-foreground">
                <User className="h-8 w-8 mb-2" />
                <span>My Profile</span>
              </Button>
              <Button className="h-auto py-6 flex flex-col">
                <MessageCircle className="h-8 w-8 mb-2" />
                <span>Contact Us</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="services" className="space-y-6 mt-2">
        <ServiceRequests />
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-6 mt-2">
        <UserProfile />
      </TabsContent>
      
      <TabsContent value="forms" className="space-y-6 mt-2">
        <FormsDownload />
      </TabsContent>
      
      <TabsContent value="messages" className="space-y-6 mt-2">
        <Messages />
      </TabsContent>
      
      <TabsContent value="payments" className="space-y-6 mt-2">
        <Payments />
      </TabsContent>
    </DashboardLayout>
  );
};

export default PublicDashboard;
