
import { useState } from "react";
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
  DatabaseIcon,
  Layers,
  FileText
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Placeholder component for stats
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,284</div>
          <p className="text-xs text-muted-foreground">
            +180 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          <UserPlus className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            +4 new staff this month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Building2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            All departments active
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-muted-foreground">
            +201 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// User management component
const UserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock departments and roles for demonstration
  const departments = [
    { id: "dept1", name: "Civil Registry" },
    { id: "dept2", name: "Land Administration" },
    { id: "dept3", name: "Finance" },
    { id: "dept4", name: "Social Services" }
  ];

  const roles = [
    { id: "admin", name: "Admin" },
    { id: "staff", name: "Staff" },
    { id: "user", name: "Public User" }
  ];

  // User form schema
  const userFormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role_id: z.string().min(1, "Role is required"),
    department_id: z.string().optional(),
  });

  // Form for adding a new user
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role_id: "",
      department_id: "",
    },
  });

  // Edit user form
  const editUserForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role_id: "",
      department_id: "",
    },
  });

  // Function to handle adding a new user
  const onAddUser = (data: z.infer<typeof userFormSchema>) => {
    console.log("Adding user:", data);
    // Here you would normally call an API to create the user
    toast.success("User created successfully");
    setIsAddUserModalOpen(false);
    userForm.reset();
  };

  // Function to handle editing a user
  const onEditUser = (data: z.infer<typeof userFormSchema>) => {
    console.log("Editing user:", data);
    // Here you would normally call an API to update the user
    toast.success("User updated successfully");
    setIsEditUserModalOpen(false);
    editUserForm.reset();
  };

  // Function to open edit modal with user data
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    editUserForm.reset({
      username: user.username,
      email: user.email,
      password: "",
      role_id: user.role_id,
      department_id: user.department_id,
    });
    setIsEditUserModalOpen(true);
  };

  // Mock users data for demonstration
  const users = [
    { id: "u1", username: "admin1", email: "admin1@dskalmunai.lk", role_id: "admin", department_id: "dept1", role: "Admin", department: "Civil Registry" },
    { id: "u2", username: "staff1", email: "staff1@dskalmunai.lk", role_id: "staff", department_id: "dept2", role: "Staff", department: "Land Administration" },
    { id: "u3", username: "user1", email: "user1@example.com", role_id: "user", department_id: "", role: "Public User", department: "N/A" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">User Management</h2>
        <Button onClick={() => setIsAddUserModalOpen(true)} className="bg-primary text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Username</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Department</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.department}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
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
                      className="text-destructive"
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

      {/* Add User Modal */}
      <ModalForm
        title="Add New User"
        description="Create a new user account"
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
      >
        <Form {...userForm}>
          <form onSubmit={userForm.handleSubmit(onAddUser)} className="space-y-4">
            <FormField
              control={userForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userForm.control}
              name="role_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userForm.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (Optional for Staff)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
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

      {/* Edit User Modal */}
      <ModalForm
        title="Edit User"
        description="Update user account information"
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
      >
        <Form {...editUserForm}>
          <form onSubmit={editUserForm.handleSubmit(onEditUser)} className="space-y-4">
            {/* Same form fields as Add User Modal */}
            <FormField
              control={editUserForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (Leave blank to keep unchanged)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="role_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editUserForm.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (Optional for Staff)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
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
    </div>
  );
};

// Department management component
const DepartmentManagement = () => {
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  
  // Department form schema
  const deptFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
  });
  
  // Form for adding a new department
  const deptForm = useForm<z.infer<typeof deptFormSchema>>({
    resolver: zodResolver(deptFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  // Function to handle adding a new department
  const onAddDepartment = (data: z.infer<typeof deptFormSchema>) => {
    console.log("Adding department:", data);
    toast.success("Department created successfully");
    setIsAddDeptModalOpen(false);
    deptForm.reset();
  };
  
  // Mock departments data
  const departments = [
    { id: "dept1", name: "Civil Registry", description: "Handles vital statistics and civil registration", divisions: 3 },
    { id: "dept2", name: "Land Administration", description: "Manages land records and ownership", divisions: 2 },
    { id: "dept3", name: "Finance", description: "Handles financial matters and budgeting", divisions: 4 },
    { id: "dept4", name: "Social Services", description: "Provides social welfare services", divisions: 2 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Department Management</h2>
        <Button onClick={() => setIsAddDeptModalOpen(true)} className="bg-primary text-white">
          <Building2 className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{dept.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{dept.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">{dept.divisions} Divisions</span>
                <Button variant="outline" size="sm">Manage Divisions</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add Department Modal */}
      <ModalForm
        title="Add New Department"
        description="Create a new department"
        open={isAddDeptModalOpen}
        onOpenChange={setIsAddDeptModalOpen}
      >
        <Form {...deptForm}>
          <form onSubmit={deptForm.handleSubmit(onAddDepartment)} className="space-y-4">
            <FormField
              control={deptForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={deptForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter department description" 
                      className="min-h-[80px]" 
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
                  setIsAddDeptModalOpen(false);
                  deptForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Add Department
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
    </div>
  );
};

// Division management component
const DivisionManagement = () => {
  const [isAddDivisionModalOpen, setIsAddDivisionModalOpen] = useState(false);
  
  // Division form schema
  const divisionFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    department_id: z.string().min(1, "Department is required"),
    description: z.string().min(5, "Description must be at least 5 characters"),
  });
  
  // Form for adding a new division
  const divisionForm = useForm<z.infer<typeof divisionFormSchema>>({
    resolver: zodResolver(divisionFormSchema),
    defaultValues: {
      name: "",
      department_id: "",
      description: "",
    },
  });
  
  // Function to handle adding a new division
  const onAddDivision = (data: z.infer<typeof divisionFormSchema>) => {
    console.log("Adding division:", data);
    toast.success("Division created successfully");
    setIsAddDivisionModalOpen(false);
    divisionForm.reset();
  };
  
  // Mock departments for the dropdown
  const departments = [
    { id: "dept1", name: "Civil Registry" },
    { id: "dept2", name: "Land Administration" },
    { id: "dept3", name: "Finance" },
    { id: "dept4", name: "Social Services" }
  ];
  
  // Mock divisions data
  const divisions = [
    { id: "div1", name: "Birth Registration", department_id: "dept1", department: "Civil Registry", description: "Handles birth registration and certificates" },
    { id: "div2", name: "Marriage Registration", department_id: "dept1", department: "Civil Registry", description: "Handles marriage registration and certificates" },
    { id: "div3", name: "Land Records", department_id: "dept2", department: "Land Administration", description: "Maintains land ownership records" },
    { id: "div4", name: "Budget Management", department_id: "dept3", department: "Finance", description: "Handles budget planning and execution" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Division Management</h2>
        <Button onClick={() => setIsAddDivisionModalOpen(true)} className="bg-primary text-white">
          <Layers className="h-4 w-4 mr-2" />
          Add Division
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Division Name</th>
              <th className="px-4 py-3 text-left font-medium">Department</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {divisions.map((division) => (
              <tr key={division.id} className="border-t">
                <td className="px-4 py-3">{division.name}</td>
                <td className="px-4 py-3">{division.department}</td>
                <td className="px-4 py-3">{division.description}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Division Modal */}
      <ModalForm
        title="Add New Division"
        description="Create a new division within a department"
        open={isAddDivisionModalOpen}
        onOpenChange={setIsAddDivisionModalOpen}
      >
        <Form {...divisionForm}>
          <form onSubmit={divisionForm.handleSubmit(onAddDivision)} className="space-y-4">
            <FormField
              control={divisionForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter division name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={divisionForm.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
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
              control={divisionForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter division description" 
                      className="min-h-[80px]" 
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
                  setIsAddDivisionModalOpen(false);
                  divisionForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Add Division
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
    </div>
  );
};

// Service management component
const ServiceManagement = () => {
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  
  // Service form schema
  const serviceFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
  });
  
  // Form for adding a new service
  const serviceForm = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  // Function to handle adding a new service
  const onAddService = (data: z.infer<typeof serviceFormSchema>) => {
    console.log("Adding service:", data);
    toast.success("Service created successfully");
    setIsAddServiceModalOpen(false);
    serviceForm.reset();
  };
  
  // Mock services data
  const services = [
    { id: "serv1", name: "Birth Certificate", description: "Issue and verify birth certificates" },
    { id: "serv2", name: "Marriage Certificate", description: "Issue and verify marriage certificates" },
    { id: "serv3", name: "Land Title", description: "Process and verify land ownership titles" },
    { id: "serv4", name: "Financial Aid", description: "Process applications for financial assistance" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Service Management</h2>
        <Button onClick={() => setIsAddServiceModalOpen(true)} className="bg-primary text-white">
          <FileText className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Service Name</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t">
                <td className="px-4 py-3">{service.name}</td>
                <td className="px-4 py-3">{service.description}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Service Modal */}
      <ModalForm
        title="Add New Service"
        description="Create a new service"
        open={isAddServiceModalOpen}
        onOpenChange={setIsAddServiceModalOpen}
      >
        <Form {...serviceForm}>
          <form onSubmit={serviceForm.handleSubmit(onAddService)} className="space-y-4">
            <FormField
              control={serviceForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={serviceForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter service description" 
                      className="min-h-[80px]" 
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
                  setIsAddServiceModalOpen(false);
                  serviceForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Add Service
              </Button>
            </div>
          </form>
        </Form>
      </ModalForm>
    </div>
  );
};

// Settings component
const SystemSettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Configure system-wide settings and preferences.</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Enable or disable system email notifications</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Security Settings</h3>
              <p className="text-sm text-muted-foreground">Configure password policies and account security</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">System Backup</h3>
              <p className="text-sm text-muted-foreground">Configure automatic backup settings</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main admin dashboard component
const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Users", icon: Users, value: "users" },
    { label: "Departments", icon: Building2, value: "departments" },
    { label: "Divisions", icon: Layers, value: "divisions" },
    { label: "Services", icon: FileText, value: "services" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];
  
  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage your system from here.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6 mt-2">
        <UserManagement />
      </TabsContent>
      
      <TabsContent value="departments" className="space-y-6 mt-2">
        <DepartmentManagement />
      </TabsContent>
      
      <TabsContent value="divisions" className="space-y-6 mt-2">
        <DivisionManagement />
      </TabsContent>
      
      <TabsContent value="services" className="space-y-6 mt-2">
        <ServiceManagement />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6 mt-2">
        <SystemSettings />
      </TabsContent>
    </DashboardLayout>
  );
};

export default AdminDashboard;
