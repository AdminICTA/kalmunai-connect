
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  UserCheck, 
  FileEdit, 
  ClipboardList, 
  DownloadCloud, 
  FileText,
  Building,
  UserSearch,
  Save,
  Check
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModalForm } from "@/components/ui/modal-form";

const PublicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data
  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      // Mock user data
      setUser({
        id: id,
        qr_code: "DSPUB-12345",
        full_name: "Fathima Rizna",
        email: "fathima@example.com",
        phone: "0771234567",
        address: "123 Main St, Kalmunai",
        nic: "901234567V",
        profile_image: null
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  // User form schema
  const userFormSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number must be at least 8 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    nic: z.string().min(10, "NIC must be at least 10 characters"),
  });

  // Form for editing user details
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      address: "",
      nic: "",
    },
  });

  // Service request form schema
  const serviceRequestFormSchema = z.object({
    service_id: z.string().min(1, "Please select a service"),
    department_id: z.string().min(1, "Please select a department"),
    division_id: z.string().min(1, "Please select a division"),
    purpose: z.string().min(5, "Please describe your purpose"),
  });

  // Form for service request
  const serviceRequestForm = useForm<z.infer<typeof serviceRequestFormSchema>>({
    resolver: zodResolver(serviceRequestFormSchema),
    defaultValues: {
      service_id: "",
      department_id: "",
      division_id: "",
      purpose: "",
    },
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      userForm.reset({
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        nic: user.nic,
      });
    }
  }, [user, userForm]);

  // Function to handle user update
  const onUpdateUser = (data: z.infer<typeof userFormSchema>) => {
    console.log("Updating user:", data);
    // Here you would normally call an API to update the user
    toast.success("User updated successfully");
    
    // Update the local user state
    setUser({
      ...user,
      ...data
    });
  };

  // Function to handle service request
  const onSubmitServiceRequest = (data: z.infer<typeof serviceRequestFormSchema>) => {
    console.log("Submitting service request:", data);
    // Here you would normally call an API to submit the request
    toast.success("Service request submitted successfully");
    setIsRequestModalOpen(false);
    serviceRequestForm.reset();
  };

  // Mock services, departments and divisions data
  const services = [
    { id: "serv1", name: "Birth Certificate" },
    { id: "serv2", name: "Marriage Certificate" },
    { id: "serv3", name: "Land Title" },
    { id: "serv4", name: "Financial Aid" }
  ];

  const departments = [
    { id: "dept1", name: "Civil Registry" },
    { id: "dept2", name: "Land Administration" },
    { id: "dept3", name: "Finance" },
    { id: "dept4", name: "Social Services" }
  ];

  const divisions = [
    { id: "div1", department_id: "dept1", name: "Birth Registration" },
    { id: "div2", department_id: "dept1", name: "Marriage Registration" },
    { id: "div3", department_id: "dept2", name: "Land Records" },
    { id: "div4", department_id: "dept3", name: "Budget Management" }
  ];

  // Mock service requests data
  const serviceRequests = [
    { id: "req1", service: "Birth Certificate", department: "Civil Registry", division: "Birth Registration", status: "Approved", date: "2023-05-15" },
    { id: "req2", service: "Land Title", department: "Land Administration", division: "Land Records", status: "Pending", date: "2023-06-22" },
    { id: "req3", service: "Financial Aid", department: "Finance", division: "Budget Management", status: "Rejected", date: "2023-04-10" }
  ];

  // Mock available forms data
  const availableForms = [
    { id: "form1", name: "Birth Certificate Application Form", department: "Civil Registry", downloadUrl: "#" },
    { id: "form2", name: "Land Title Registration Form", department: "Land Administration", downloadUrl: "#" },
    { id: "form3", name: "Financial Aid Application Form", department: "Finance", downloadUrl: "#" }
  ];

  // Filter divisions based on selected department
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const filteredDivisions = divisions.filter(
    division => division.department_id === selectedDepartment
  );

  // Handler for department selection
  const handleDepartmentChange = (value: string) => {
    serviceRequestForm.setValue("department_id", value);
    serviceRequestForm.setValue("division_id", ""); // Reset division when department changes
    setSelectedDepartment(value);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard/staff")}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">{user.full_name}'s Profile</h1>
          <p className="text-muted-foreground">Manage user details, service requests, and forms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User info card */}
          <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md md:col-span-1 h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserSearch className="h-16 w-16 text-primary/60" />
                </div>
                <h2 className="text-xl font-bold mb-1">{user.full_name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.nic}</p>
                
                <div className="bg-white p-4 rounded-lg shadow-sm w-full mb-4">
                  <QRCodeSVG
                    value={user.qr_code}
                    size={150}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                  <p className="text-xs text-center mt-2">{user.qr_code}</p>
                </div>
                
                <div className="w-full text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Address:</span>
                    <span className="text-sm">{user.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="details" className="text-sm">
                  <UserCheck className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="requests" className="text-sm">
                  <ClipboardList className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Requests
                </TabsTrigger>
                <TabsTrigger value="forms" className="text-sm">
                  <FileText className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Forms
                </TabsTrigger>
                <TabsTrigger value="departments" className="text-sm">
                  <Building className="h-4 w-4 mr-2 hidden sm:inline-block" />
                  Departments
                </TabsTrigger>
              </TabsList>

              {/* User Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileEdit className="h-5 w-5 mr-2" />
                      Edit User Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...userForm}>
                      <form onSubmit={userForm.handleSubmit(onUpdateUser)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={userForm.control}
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
                        </div>
                        
                        <FormField
                          control={userForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter address" {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end pt-4">
                          <Button type="submit" className="bg-primary text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Service Requests Tab */}
              <TabsContent value="requests" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Service Requests</h3>
                  <Button 
                    onClick={() => setIsRequestModalOpen(true)} 
                    className="bg-primary text-white"
                  >
                    New Request
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-3 text-left font-medium">Service</th>
                            <th className="px-4 py-3 text-left font-medium">Department</th>
                            <th className="px-4 py-3 text-left font-medium">Division</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-left font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceRequests.map((request) => (
                            <tr key={request.id} className="border-t">
                              <td className="px-4 py-3">{request.service}</td>
                              <td className="px-4 py-3">{request.department}</td>
                              <td className="px-4 py-3">{request.division}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  request.status === "Approved" 
                                    ? "bg-green-100 text-green-800" 
                                    : request.status === "Pending" 
                                      ? "bg-yellow-100 text-yellow-800" 
                                      : "bg-red-100 text-red-800"
                                }`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">{request.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Forms Tab */}
              <TabsContent value="forms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Forms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availableForms.map((form) => (
                        <div key={form.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <h3 className="font-medium">{form.name}</h3>
                            <p className="text-sm text-muted-foreground">{form.department}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                            onClick={() => {
                              toast.success(`Form ${form.name} downloaded successfully`);
                            }}
                          >
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Departments Tab */}
              <TabsContent value="departments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Departments & Divisions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {departments.map((department) => {
                        const departmentDivisions = divisions.filter(
                          div => div.department_id === department.id
                        );
                        
                        return (
                          <div key={department.id} className="space-y-2">
                            <h3 className="font-semibold text-lg">{department.name}</h3>
                            <div className="pl-4 space-y-2">
                              {departmentDivisions.map((division) => (
                                <div key={division.id} className="flex items-center">
                                  <Check className="h-4 w-4 text-primary mr-2" />
                                  <span>{division.name}</span>
                                </div>
                              ))}
                            </div>
                            <div className="border-t my-4"></div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Service Request Modal */}
        <ModalForm
          title="New Service Request"
          description="Request a government service"
          open={isRequestModalOpen}
          onOpenChange={setIsRequestModalOpen}
        >
          <Form {...serviceRequestForm}>
            <form onSubmit={serviceRequestForm.handleSubmit(onSubmitServiceRequest)} className="space-y-4">
              <FormField
                control={serviceRequestForm.control}
                name="service_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
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
                control={serviceRequestForm.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select 
                      onValueChange={(value) => handleDepartmentChange(value)} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map(department => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceRequestForm.control}
                name="division_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!selectedDepartment}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedDepartment ? "Select a division" : "Select a department first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredDivisions.map(division => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceRequestForm.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the purpose of your request" {...field} rows={4} />
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
                    serviceRequestForm.reset();
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
    </MainLayout>
  );
};

export default PublicDetails;
