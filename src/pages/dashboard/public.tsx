
import { useState } from "react";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { 
  User, 
  FileText, 
  History, 
  Settings,
  Building,
  MessageSquare,
  CreditCard,
  Download,
  Mail
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Placeholder component for stats
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            +1 new this week
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
          <History className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            +3 last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">
            +1 new notification
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payments Due</CardTitle>
          <CreditCard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs 1,200</div>
          <p className="text-xs text-muted-foreground">
            Birth certificate fee
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Department services component
const DepartmentServices = () => {
  const [isRequestServiceOpen, setIsRequestServiceOpen] = useState(false);
  
  // Service request schema
  const serviceSchema = z.object({
    service_id: z.string().min(1, "Service is required"),
    department_id: z.string().min(1, "Department is required"),
    details: z.string().min(5, "Details must be at least 5 characters"),
  });
  
  // Service request form
  const serviceForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      service_id: "",
      department_id: "",
      details: "",
    },
  });
  
  // Handle service request submission
  const onSubmitServiceRequest = (data: z.infer<typeof serviceSchema>) => {
    console.log("Service request:", data);
    toast.success("Service request submitted successfully");
    setIsRequestServiceOpen(false);
    serviceForm.reset();
  };
  
  // Placeholder data for services departments
  const departments = [
    {
      id: "dept1",
      name: "Civil Registry",
      icon: FileText,
      services: [
        { id: "serv1", name: "Birth Certificate" },
        { id: "serv2", name: "Death Certificate" },
        { id: "serv3", name: "Marriage Certificate" },
        { id: "serv4", name: "ID Card Application" }
      ]
    },
    {
      id: "dept2",
      name: "Land Administration",
      icon: Building,
      services: [
        { id: "serv5", name: "Land Ownership Certificate" },
        { id: "serv6", name: "Property Transfer" },
        { id: "serv7", name: "Land Disputes" },
        { id: "serv8", name: "Building Permits" }
      ]
    },
    {
      id: "dept3",
      name: "Social Services",
      icon: User,
      services: [
        { id: "serv9", name: "Financial Assistance" },
        { id: "serv10", name: "Community Development" },
        { id: "serv11", name: "Elder Care Services" },
        { id: "serv12", name: "Youth Programs" }
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Available Services</h2>
        <Button onClick={() => setIsRequestServiceOpen(true)} className="bg-primary text-white">
          <FileText className="h-4 w-4 mr-2" />
          Request Service
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="glass-card group hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <dept.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{dept.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {dept.services.map((service) => (
                  <li key={service.id} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></div>
                    {service.name}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary text-white">
                View Services
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Request Service Modal */}
      <ModalForm
        title="Request Service"
        description="Submit a new service request"
        open={isRequestServiceOpen}
        onOpenChange={setIsRequestServiceOpen}
      >
        <Form {...serviceForm}>
          <form onSubmit={serviceForm.handleSubmit(onSubmitServiceRequest)} className="space-y-4">
            <FormField
              control={serviceForm.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Reset service when department changes
                      serviceForm.setValue("service_id", "");
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={serviceForm.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!serviceForm.watch("department_id")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={serviceForm.watch("department_id") ? "Select service" : "Select department first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceForm.watch("department_id") && 
                        departments
                          .find(d => d.id === serviceForm.watch("department_id"))
                          ?.services.map(service => (
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
              control={serviceForm.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional details or requirements" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
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
                  setIsRequestServiceOpen(false);
                  serviceForm.reset();
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
    </div>
  );
};

// History component
const HistoryComponent = () => {
  // Placeholder data for service history
  const serviceHistory = [
    {
      id: "SRV-2023-001",
      service: "Birth Certificate",
      department: "Civil Registry",
      requestedDate: "2023-04-15",
      status: "Completed",
      statusClass: "bg-green-100 text-green-800"
    },
    {
      id: "SRV-2023-045",
      service: "Land Ownership Certificate",
      department: "Land Administration",
      requestedDate: "2023-05-20",
      status: "Processing",
      statusClass: "bg-blue-100 text-blue-800"
    },
    {
      id: "SRV-2023-078",
      service: "ID Card Application",
      department: "Civil Registry",
      requestedDate: "2023-06-10",
      status: "Pending Verification",
      statusClass: "bg-yellow-100 text-yellow-800"
    }
  ];
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Service History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left font-medium">Request ID</th>
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Requested Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceHistory.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{item.id}</td>
                  <td className="px-4 py-3">{item.service}</td>
                  <td className="px-4 py-3">{item.department}</td>
                  <td className="px-4 py-3">{item.requestedDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Forms component
const FormsComponent = () => {
  // Placeholder data for available forms
  const availableForms = [
    { 
      id: "form1", 
      name: "Birth Certificate Application", 
      department: "Civil Registry",
      format: "PDF",
      size: "125 KB"
    },
    { 
      id: "form2", 
      name: "Marriage Certificate Application", 
      department: "Civil Registry",
      format: "PDF",
      size: "118 KB"
    },
    { 
      id: "form3", 
      name: "Land Ownership Certificate Application", 
      department: "Land Administration",
      format: "PDF",
      size: "210 KB"
    },
    { 
      id: "form4", 
      name: "Financial Assistance Application", 
      department: "Social Services",
      format: "PDF",
      size: "185 KB"
    }
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Available Forms</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Form Name</th>
              <th className="px-4 py-3 text-left font-medium">Department</th>
              <th className="px-4 py-3 text-left font-medium">Format</th>
              <th className="px-4 py-3 text-left font-medium">Size</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableForms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="px-4 py-3">{form.name}</td>
                <td className="px-4 py-3">{form.department}</td>
                <td className="px-4 py-3">{form.format}</td>
                <td className="px-4 py-3">{form.size}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">Fill Online</Button>
                  </div>
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
const MessagesComponent = () => {
  // Placeholder messages data
  const messages = [
    {
      id: "msg1",
      title: "Birth Certificate Application Update",
      content: "Your application has been processed and is ready for collection.",
      sender: "Civil Registry Department",
      date: "2 hours ago",
      read: false,
      icon: FileText,
      iconClass: "bg-blue-100 text-blue-600"
    },
    {
      id: "msg2",
      title: "Profile Verification",
      content: "Your profile has been successfully verified.",
      sender: "Admin Department",
      date: "Yesterday",
      read: false,
      icon: User,
      iconClass: "bg-green-100 text-green-600"
    },
    {
      id: "msg3",
      title: "New Service Available",
      content: "A new online service for property tax payments is now available.",
      sender: "Land Administration Department",
      date: "3 days ago",
      read: true,
      icon: Building,
      iconClass: "bg-amber-100 text-amber-600"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Messages & Notifications</h2>
        <Button variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`glass-card ${!message.read ? 'border-l-4 border-l-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex">
                <div className={`w-10 h-10 rounded-full ${message.iconClass} flex items-center justify-center mr-4 flex-shrink-0`}>
                  <message.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{message.title}</h3>
                    <span className="text-xs text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">From: {message.sender}</p>
                  
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Payments component
const PaymentsComponent = () => {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  
  // Placeholder data for payments
  const pendingPayments = [
    {
      id: "pay1",
      service: "Birth Certificate",
      amount: 1200,
      dueDate: "2023-08-15",
      reference: "BC-2023-124"
    }
  ];
  
  // Payment history
  const paymentHistory = [
    {
      id: "hist1",
      service: "Marriage Certificate",
      amount: 2500,
      date: "2023-06-10",
      reference: "MC-2023-089",
      status: "Completed"
    },
    {
      id: "hist2",
      service: "Land Registration",
      amount: 5000,
      date: "2023-04-22",
      reference: "LR-2023-056",
      status: "Completed"
    }
  ];
  
  // Payment form schema
  const paymentSchema = z.object({
    card_number: z.string().min(16, "Card number must be at least 16 digits"),
    expiry_date: z.string().min(5, "Expiry date is required"),
    cvv: z.string().min(3, "CVV must be at least 3 digits"),
    name: z.string().min(2, "Name is required"),
  });
  
  // Payment form
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      card_number: "",
      expiry_date: "",
      cvv: "",
      name: "",
    },
  });
  
  // Handle payment submission
  const onSubmitPayment = (data: z.infer<typeof paymentSchema>) => {
    console.log("Payment details:", data);
    toast.success("Payment processed successfully");
    setIsPayModalOpen(false);
    paymentForm.reset();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payments</h2>
      
      {pendingPayments.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{payment.service}</h3>
                    <p className="text-sm text-muted-foreground">Ref: {payment.reference}</p>
                    <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">Rs {payment.amount.toLocaleString()}</div>
                    <Button 
                      onClick={() => setIsPayModalOpen(true)} 
                      className="mt-2 bg-primary text-white"
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No pending payments at this time.</p>
          </CardContent>
        </Card>
      )}
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Reference</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-t">
                    <td className="px-4 py-3">{payment.service}</td>
                    <td className="px-4 py-3">{payment.reference}</td>
                    <td className="px-4 py-3">{payment.date}</td>
                    <td className="px-4 py-3 text-right">Rs {payment.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Payment Modal */}
      <ModalForm
        title="Make Payment"
        description="Enter your card details to complete the payment"
        open={isPayModalOpen}
        onOpenChange={setIsPayModalOpen}
      >
        {pendingPayments.length > 0 && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium">{pendingPayments[0].service}</span>
            </div>
            <div className="flex justify-between">
              <span>Reference:</span>
              <span className="font-medium">{pendingPayments[0].reference}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium">Rs {pendingPayments[0].amount.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        <Form {...paymentForm}>
          <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-4">
            <FormField
              control={paymentForm.control}
              name="card_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={paymentForm.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={paymentForm.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={paymentForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  setIsPayModalOpen(false);
                  paymentForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Pay Rs {pendingPayments.length > 0 ? pendingPayments[0].amount.toLocaleString() : "0"}
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
    </div>
  );
};

// User profile component
const ProfileComponent = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Profile form schema
  const profileSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  });
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "Sarah Thompson",
      email: "sarah.thompson@example.com",
      phone: "+94 77 1234567",
      address: "123 Main Street, Kalmunai",
    },
  });
  
  // Handle profile update submission
  const onUpdateProfile = (data: z.infer<typeof profileSchema>) => {
    console.log("Profile update:", data);
    toast.success("Profile updated successfully");
    setIsEditProfileOpen(false);
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Personal Profile</CardTitle>
          <Button variant="outline" onClick={() => setIsEditProfileOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary/50" />
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <div className="text-lg">Sarah Thompson</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">ID Number</label>
                <div className="text-lg">984567321V</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <div className="text-lg">sarah.thompson@example.com</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                <div className="text-lg">+94 77 1234567</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                <div className="text-lg">123 Main Street, Kalmunai</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Date of Birth</label>
                <div className="text-lg">15 March 1984</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Edit Profile Modal */}
      <ModalForm
        title="Edit Profile"
        description="Update your personal information"
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
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
                  <FormLabel>Phone</FormLabel>
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
                onClick={() => setIsEditProfileOpen(false)}
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
    </Card>
  );
};

// Main public dashboard component
const PublicDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: Building, value: "overview" },
    { label: "Services", icon: FileText, value: "services" },
    { label: "History", icon: History, value: "history" },
    { label: "Forms", icon: Download, value: "forms" },
    { label: "Messages", icon: MessageSquare, value: "messages" },
    { label: "Payments", icon: CreditCard, value: "payments" },
    { label: "Profile", icon: User, value: "profile" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];
  
  return (
    <DashboardLayout 
      title="Citizen Portal" 
      subtitle={`Welcome, ${user?.username}. Access government services and track your applications.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
        <DepartmentServices />
      </TabsContent>
      
      <TabsContent value="services" className="space-y-6 mt-2">
        <DepartmentServices />
      </TabsContent>
      
      <TabsContent value="history" className="space-y-6 mt-2">
        <HistoryComponent />
      </TabsContent>
      
      <TabsContent value="forms" className="space-y-6 mt-2">
        <FormsComponent />
      </TabsContent>
      
      <TabsContent value="messages" className="space-y-6 mt-2">
        <MessagesComponent />
      </TabsContent>
      
      <TabsContent value="payments" className="space-y-6 mt-2">
        <PaymentsComponent />
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-6 mt-2">
        <ProfileComponent />
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
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage email notification preferences</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">SMS Alerts</h3>
                  <p className="text-sm text-muted-foreground">Manage SMS notification preferences</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-muted-foreground">Set your preferred language</p>
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="si">Sinhala</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default PublicDashboard;
