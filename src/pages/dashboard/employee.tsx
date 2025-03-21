
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
  Calendar,
  Clock,
  FileText,
  Inbox,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  Building2
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Stats Component
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18 days</div>
          <p className="text-xs text-muted-foreground">
            12 casual, 6 vacation
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">
            Awaiting approval
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">
            4 current, 3 pending
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <Inbox className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">
            2 unread
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Leave Management Component
const LeaveManagement = () => {
  const { user } = useAuth();
  const [isRequestLeaveModalOpen, setIsRequestLeaveModalOpen] = useState(false);
  const [isViewLeaveModalOpen, setIsViewLeaveModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);

  // Leave request schema
  const leaveFormSchema = z.object({
    leave_type: z.string().min(1, "Leave type is required"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z.date({
      required_error: "End date is required",
    }),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    contact_during_leave: z.string().min(10, "Contact number must be at least 10 digits")
  }).refine(data => data.end_date >= data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });

  // Form for requesting leave
  const leaveForm = useForm<z.infer<typeof leaveFormSchema>>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      leave_type: "",
      reason: "",
      contact_during_leave: "",
    },
  });

  // Function to handle requesting leave
  const onRequestLeave = (data: z.infer<typeof leaveFormSchema>) => {
    const newLeaveRequest = {
      request_id: "leave_" + Date.now().toString(),
      staff_id: user?.id || "",
      staff_name: user?.username || "",
      leave_type: data.leave_type,
      start_date: data.start_date,
      end_date: data.end_date,
      reason: data.reason,
      contact_during_leave: data.contact_during_leave,
      status: "Pending",
      chief_clerk_approval: null,
      hod_approval: null,
      submitted_date: new Date(),
    };
    
    console.log("Requesting leave:", newLeaveRequest);
    
    // For demo, add to our mock data
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    
    toast.success("Leave request submitted successfully");
    setIsRequestLeaveModalOpen(false);
    leaveForm.reset();
  };

  // Function to view leave details
  const handleViewLeave = (leave: any) => {
    setSelectedLeave(leave);
    setIsViewLeaveModalOpen(true);
  };

  // Function to cancel leave request
  const handleCancelLeave = (leaveId: string) => {
    setLeaveRequests(leaveRequests.filter(leave => leave.request_id !== leaveId));
    toast.success("Leave request cancelled successfully");
    setIsViewLeaveModalOpen(false);
  };

  // Mock leave requests data
  const [leaveRequests, setLeaveRequests] = useState([
    {
      request_id: "leave_1",
      staff_id: "u3",
      staff_name: "Marliya",
      leave_type: "Casual",
      start_date: new Date(2023, 6, 15),
      end_date: new Date(2023, 6, 17),
      reason: "Family event",
      contact_during_leave: "0776543210",
      status: "Approved",
      chief_clerk_approval: "Approved",
      hod_approval: "Approved",
      submitted_date: new Date(2023, 6, 10),
    },
    {
      request_id: "leave_2",
      staff_id: "u3",
      staff_name: "Marliya",
      leave_type: "Vacation",
      start_date: new Date(2023, 9, 5),
      end_date: new Date(2023, 9, 10),
      reason: "Annual vacation",
      contact_during_leave: "0776543210",
      status: "Rejected",
      chief_clerk_approval: "Approved",
      hod_approval: "Rejected",
      submitted_date: new Date(2023, 8, 20),
    },
    {
      request_id: "leave_3",
      staff_id: "u3",
      staff_name: "Marliya",
      leave_type: "Casual",
      start_date: new Date(2023, 11, 1),
      end_date: new Date(2023, 11, 2),
      reason: "Medical appointment",
      contact_during_leave: "0776543210",
      status: "Pending",
      chief_clerk_approval: "Approved",
      hod_approval: null,
      submitted_date: new Date(2023, 10, 25),
    }
  ]);

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 hover:bg-green-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Leave Management</h2>
        <Button onClick={() => setIsRequestLeaveModalOpen(true)} className="bg-primary text-white">
          <Calendar className="h-4 w-4 mr-2" />
          Request Leave
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium">Approved</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-yellow-100 p-3 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="font-medium">Pending</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-red-100 p-3 mb-2">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-medium">Rejected</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium">Leave Type</th>
              <th className="px-4 py-3 text-left font-medium">From</th>
              <th className="px-4 py-3 text-left font-medium">To</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Clerk</th>
              <th className="px-4 py-3 text-left font-medium">HOD</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.request_id} className="border-t">
                <td className="px-4 py-3">{leave.leave_type}</td>
                <td className="px-4 py-3">{format(leave.start_date, "MMM dd, yyyy")}</td>
                <td className="px-4 py-3">{format(leave.end_date, "MMM dd, yyyy")}</td>
                <td className="px-4 py-3">
                  <Badge className={getStatusColor(leave.status)}>
                    {leave.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {leave.chief_clerk_approval ? (
                    <Badge className={getStatusColor(leave.chief_clerk_approval)}>
                      {leave.chief_clerk_approval}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {leave.hod_approval ? (
                    <Badge className={getStatusColor(leave.hod_approval)}>
                      {leave.hod_approval}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewLeave(leave)}
                    >
                      View
                    </Button>
                    {leave.status === "Pending" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => handleCancelLeave(leave.request_id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Leave Modal */}
      <ModalForm
        title="Request Leave"
        description="Submit a new leave request"
        open={isRequestLeaveModalOpen}
        onOpenChange={setIsRequestLeaveModalOpen}
      >
        <Form {...leaveForm}>
          <form onSubmit={leaveForm.handleSubmit(onRequestLeave)} className="space-y-4">
            <FormField
              control={leaveForm.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Casual">Casual Leave</SelectItem>
                      <SelectItem value="Vacation">Vacation Leave</SelectItem>
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Special">Special Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={leaveForm.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={leaveForm.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = leaveForm.getValues().start_date;
                            return date < new Date() || (startDate && date < startDate);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={leaveForm.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Leave</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about your leave request"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={leaveForm.control}
              name="contact_during_leave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact During Leave</FormLabel>
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
                  setIsRequestLeaveModalOpen(false);
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

      {/* View Leave Modal */}
      <ModalForm
        title="Leave Request Details"
        description="View details of your leave request"
        open={isViewLeaveModalOpen}
        onOpenChange={setIsViewLeaveModalOpen}
      >
        {selectedLeave && (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <Badge className={`${getStatusColor(selectedLeave.status)} px-4 py-2 text-base`}>
                {selectedLeave.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Leave Type:</div>
                <div className="text-sm col-span-2">{selectedLeave.leave_type} Leave</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Date Range:</div>
                <div className="text-sm col-span-2">
                  {format(selectedLeave.start_date, "MMM dd, yyyy")} - {format(selectedLeave.end_date, "MMM dd, yyyy")}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Duration:</div>
                <div className="text-sm col-span-2">
                  {Math.ceil((selectedLeave.end_date.getTime() - selectedLeave.start_date.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Submitted On:</div>
                <div className="text-sm col-span-2">{format(selectedLeave.submitted_date, "MMM dd, yyyy")}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Reason:</div>
                <div className="text-sm col-span-2">{selectedLeave.reason}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Contact:</div>
                <div className="text-sm col-span-2">{selectedLeave.contact_during_leave}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">Clerk Approval:</div>
                <div className="text-sm col-span-2">
                  {selectedLeave.chief_clerk_approval ? (
                    <Badge className={getStatusColor(selectedLeave.chief_clerk_approval)}>
                      {selectedLeave.chief_clerk_approval}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-1 border-b">
                <div className="text-sm font-medium">HOD Approval:</div>
                <div className="text-sm col-span-2">
                  {selectedLeave.hod_approval ? (
                    <Badge className={getStatusColor(selectedLeave.hod_approval)}>
                      {selectedLeave.hod_approval}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              {selectedLeave.status === "Pending" && (
                <Button 
                  variant="outline" 
                  className="text-destructive"
                  onClick={() => handleCancelLeave(selectedLeave.request_id)}
                >
                  Cancel Request
                </Button>
              )}
              <Button 
                onClick={() => setIsViewLeaveModalOpen(false)}
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

// Department Work Component
const DepartmentWork = () => {
  const { user } = useAuth();
  
  // Mock department data based on user's department
  const userDepartment = user?.department_id || "ACC1";
  
  // Get department name based on ID
  const getDepartmentName = (departmentId: string) => {
    const departments: Record<string, string> = {
      "ADM1": "Admin",
      "ADR1": "Administration Records",
      "ACC1": "Accounts",
      "NIC1": "NIC Department",
      "LND1": "Land Department",
      "REG1": "Registration Department"
    };
    return departments[departmentId] || "Unknown Department";
  };
  
  // Mock tasks data
  const departmentTasks = [
    {
      id: "task1",
      title: "Monthly Accounts Reconciliation",
      status: "Current",
      dueDate: format(new Date(2023, 8, 30), "MMM dd, yyyy"),
      priority: "High",
      description: "Complete the monthly accounts reconciliation for all departments"
    },
    {
      id: "task2",
      title: "Prepare Budget Reports",
      status: "Current",
      dueDate: format(new Date(2023, 9, 15), "MMM dd, yyyy"),
      priority: "Medium",
      description: "Prepare budget reports for Q3 2023"
    },
    {
      id: "task3",
      title: "Audit Preparation",
      status: "Pending",
      dueDate: format(new Date(2023, 10, 5), "MMM dd, yyyy"),
      priority: "High",
      description: "Prepare necessary documents for upcoming internal audit"
    },
    {
      id: "task4",
      title: "Update Payment Records",
      status: "Completed",
      dueDate: format(new Date(2023, 8, 10), "MMM dd, yyyy"),
      priority: "Medium",
      description: "Update all payment records for August 2023"
    }
  ];
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-blue-500 hover:bg-blue-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Completed":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Department Work</h2>
          <p className="text-muted-foreground">
            {getDepartmentName(userDepartment)} - Work assignments and tasks
          </p>
        </div>
        <Button className="bg-primary text-white">
          <Building2 className="h-4 w-4 mr-2" />
          Department Info
        </Button>
      </div>
      
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-blue-100 p-3 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium">Current</h3>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-yellow-100 p-3 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="font-medium">Pending</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium">Completed</h3>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tasks List */}
      <div className="space-y-4">
        {departmentTasks.map((task) => (
          <Card key={task.id} className="glass-card overflow-hidden">
            <div className="flex items-center border-b p-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
              </div>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <p className="text-sm">{task.description}</p>
              <div className="flex justify-end mt-4">
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Main employee dashboard component
const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Leave Management", icon: Calendar, value: "leave" },
    { label: "Department Work", icon: Building2, value: "department" },
    { label: "Messages", icon: Inbox, value: "messages" },
  ];
  
  return (
    <DashboardLayout 
      title="Employee Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage your work and leave requests.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Casual Leave</p>
                  <p className="text-xs text-muted-foreground">Dec 1-2, 2023</p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Vacation Leave</p>
                  <p className="text-xs text-muted-foreground">Oct 5-10, 2023</p>
                </div>
                <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Casual Leave</p>
                  <p className="text-xs text-muted-foreground">Jul 15-17, 2023</p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">View All Leave Requests</Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Department Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Monthly Accounts Reconciliation</p>
                  <p className="text-xs text-muted-foreground">Due: Sept 30, 2023</p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600">Current</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Prepare Budget Reports</p>
                  <p className="text-xs text-muted-foreground">Due: Oct 15, 2023</p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600">Current</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Audit Preparation</p>
                  <p className="text-xs text-muted-foreground">Due: Nov 5, 2023</p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">View All Tasks</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="leave" className="space-y-6 mt-2">
        <LeaveManagement />
      </TabsContent>
      
      <TabsContent value="department" className="space-y-6 mt-2">
        <DepartmentWork />
      </TabsContent>
      
      <TabsContent value="messages" className="space-y-6 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button className="bg-primary text-white">
            <FileText className="h-4 w-4 mr-2" />
            Compose Message
          </Button>
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-background">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
            {/* Message List */}
            <div className="border-r overflow-y-auto">
              <div className="p-3 border-b bg-muted font-medium">Inbox (5)</div>
              <div className="divide-y">
                <div className="p-3 bg-accent/10 border-l-4 border-primary">
                  <p className="font-medium">Department Meeting</p>
                  <p className="text-xs text-muted-foreground">Admin - 2 hours ago</p>
                </div>
                <div className="p-3">
                  <p className="font-medium">Budget Approval</p>
                  <p className="text-xs text-muted-foreground">Finance - Yesterday</p>
                </div>
                <div className="p-3">
                  <p className="font-medium">New Policy Update</p>
                  <p className="text-xs text-muted-foreground">HR - 2 days ago</p>
                </div>
                <div className="p-3">
                  <p className="font-medium">Leave Request Approved</p>
                  <p className="text-xs text-muted-foreground">System - 4 days ago</p>
                </div>
                <div className="p-3">
                  <p className="font-medium">Training Schedule</p>
                  <p className="text-xs text-muted-foreground">IT Dept - 1 week ago</p>
                </div>
              </div>
            </div>
            
            {/* Message Content */}
            <div className="col-span-2 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-bold">Department Meeting</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span>From: Admin</span>
                  <span className="mx-2">•</span>
                  <span>Oct 15, 2023 10:30 AM</span>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <p>Dear Team,</p>
                <p className="my-4">
                  This is a reminder that we will be having our monthly department meeting tomorrow at 10:00 AM in the conference room.
                </p>
                <p className="my-4">
                  Please come prepared with your progress reports and any issues you would like to discuss. We will be reviewing the quarterly targets and planning for the next month.
                </p>
                <p className="my-4">
                  If you have any specific agenda items you would like to add, please respond to this message before 5:00 PM today.
                </p>
                <p>Best regards,</p>
                <p>Admin Team</p>
              </div>
              <div className="p-4 border-t flex justify-end space-x-2">
                <Button variant="outline">Reply</Button>
                <Button variant="outline">Forward</Button>
                <Button variant="outline" className="text-destructive">Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
