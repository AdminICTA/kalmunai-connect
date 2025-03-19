
import { useState } from "react";
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Calendar, 
  Clock, 
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  Clock8,
  Building2
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Placeholder component for leave management
const LeaveManagement = () => {
  const [isRequestLeaveOpen, setIsRequestLeaveOpen] = useState(false);
  
  // Leave request schema
  const leaveSchema = z.object({
    leave_type: z.string().min(1, "Leave type is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
  });
  
  // Leave request form
  const leaveForm = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: "",
    },
  });
  
  // Handle leave request submission
  const onSubmitLeaveRequest = (data: z.infer<typeof leaveSchema>) => {
    console.log("Leave request:", data);
    toast.success("Leave request submitted successfully");
    setIsRequestLeaveOpen(false);
    leaveForm.reset();
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Leave Balance</CardTitle>
          <Button onClick={() => setIsRequestLeaveOpen(true)} className="bg-primary text-white">
            Request Leave
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">14</div>
              <div className="text-sm text-muted-foreground">Annual Leave Days</div>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-muted-foreground">Casual Leave Days</div>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-sm text-muted-foreground">Duty Leave Days</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Dates</th>
                  <th className="px-4 py-3 text-left font-medium">Duration</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">Annual Leave</td>
                  <td className="px-4 py-3">April 15 - April 18, 2023</td>
                  <td className="px-4 py-3">4 days</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Duty Leave</td>
                  <td className="px-4 py-3">March 10, 2023</td>
                  <td className="px-4 py-3">1 day</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Casual Leave</td>
                  <td className="px-4 py-3">February 28, 2023</td>
                  <td className="px-4 py-3">1 day</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm font-medium text-amber-600">
                      <Clock8 className="h-4 w-4 mr-1" />
                      Pending
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Annual Leave</td>
                  <td className="px-4 py-3">January 2 - January 5, 2023</td>
                  <td className="px-4 py-3">4 days</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm font-medium text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Rejected
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Request Leave Modal */}
      <ModalForm
        title="Request Leave"
        description="Submit a new leave request"
        open={isRequestLeaveOpen}
        onOpenChange={setIsRequestLeaveOpen}
      >
        <Form {...leaveForm}>
          <form onSubmit={leaveForm.handleSubmit(onSubmitLeaveRequest)} className="space-y-4">
            <FormField
              control={leaveForm.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="duty">Duty Leave</SelectItem>
                      <SelectItem value="medical">Medical Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={leaveForm.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={leaveForm.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={leaveForm.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter reason for leave" 
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
                  setIsRequestLeaveOpen(false);
                  leaveForm.reset();
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

// Department tasks component
const DepartmentTasks = () => {
  // Mock data for department and division
  const departmentInfo = {
    name: "Civil Registry",
    divisions: [
      {
        name: "Birth Registration",
        tasks: [
          { id: "t1", name: "Process birth certificate applications", status: "current" },
          { id: "t2", name: "Update birth records", status: "pending" },
          { id: "t3", name: "Generate monthly birth statistics", status: "finished" }
        ]
      },
      {
        name: "Marriage Registration",
        tasks: [
          { id: "t4", name: "Process marriage certificate applications", status: "current" },
          { id: "t5", name: "Schedule marriage registrations", status: "pending" },
          { id: "t6", name: "Update marriage records", status: "finished" }
        ]
      },
      {
        name: "Death Registration",
        tasks: [
          { id: "t7", name: "Process death certificate applications", status: "current" },
          { id: "t8", name: "Update death records", status: "pending" },
          { id: "t9", name: "Generate monthly death statistics", status: "finished" }
        ]
      }
    ]
  };
  
  // Status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">Current</span>;
      case "pending":
        return <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case "finished":
        return <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Finished</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Department: {departmentInfo.name}</h2>
      </div>
      
      <div className="space-y-6">
        {departmentInfo.divisions.map((division) => (
          <Card key={division.name} className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">{division.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Tasks</h3>
                <ul className="space-y-2">
                  {division.tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{task.name}</span>
                      {getStatusBadge(task.status)}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Personal details component
const PersonalDetails = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <div className="text-lg">John Doe</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Employee ID</label>
                <div className="text-lg">EMP-2023-045</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Department</label>
                <div className="text-lg">Civil Registry</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Position</label>
                <div className="text-lg">Senior Officer</div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Contact Number</label>
                <div className="text-lg">+94 77 1234567</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <div className="text-lg">john.doe@kalmunai.lk</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Date of Birth</label>
                <div className="text-lg">15 June 1985</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Join Date</label>
                <div className="text-lg">12 March 2015</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline">
              Edit Information
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main employee dashboard component
const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Leave Management", icon: Calendar, value: "leave" },
    { label: "Department Tasks", icon: Building2, value: "tasks" },
    { label: "Personal Details", icon: User, value: "personal" },
    { label: "Attendance", icon: Clock, value: "attendance" },
    { label: "Documents", icon: FileText, value: "documents" },
    { label: "Settings", icon: Settings, value: "settings" },
  ];
  
  return (
    <DashboardLayout 
      title="Employee Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage your employee profile and requests.`}
      menu={menuItems}
    >
      <TabsContent value="leave" className="space-y-6 mt-2">
        <LeaveManagement />
      </TabsContent>
      
      <TabsContent value="tasks" className="space-y-6 mt-2">
        <DepartmentTasks />
      </TabsContent>
      
      <TabsContent value="personal" className="space-y-6 mt-2">
        <PersonalDetails />
      </TabsContent>
      
      <TabsContent value="attendance" className="space-y-6 mt-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Attendance Record</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary/40" />
              <h2 className="text-xl font-medium mb-2">Attendance Tracking</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                View your attendance records and time logs.
              </p>
              <div className="text-center">
                <p className="text-muted-foreground">This feature will be available soon.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-6 mt-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Documents Repository</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-primary/40" />
              <h2 className="text-xl font-medium mb-2">Employee Documents</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Access and manage your important documents and certificates.
              </p>
              <div className="text-center">
                <p className="text-muted-foreground">This feature will be available soon.</p>
              </div>
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
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-muted-foreground">Set your preferred language</p>
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

export default EmployeeDashboard;
