
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Clock, 
  FileText,
  Settings as SettingsIcon,
  CheckCircle,
  XCircle,
  Clock8
} from "lucide-react";

// Placeholder component for leave management
const LeaveManagement = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-kalmunai-blue mb-2">14</div>
              <div className="text-sm text-muted-foreground">Annual Leave Days</div>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-kalmunai-green mb-2">7</div>
              <div className="text-sm text-muted-foreground">Casual Leave Days</div>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center">
              <div className="text-3xl font-bold text-kalmunai-gold mb-2">3</div>
              <div className="text-sm text-muted-foreground">Duty Leave Days</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Leave Requests</CardTitle>
          <Button>Request Leave</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Annual Leave</h3>
                <p className="text-sm text-muted-foreground">April 15 - April 18, 2023</p>
              </div>
              <div className="flex items-center text-sm font-medium text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approved
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Duty Leave</h3>
                <p className="text-sm text-muted-foreground">March 10, 2023</p>
              </div>
              <div className="flex items-center text-sm font-medium text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approved
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Casual Leave</h3>
                <p className="text-sm text-muted-foreground">February 28, 2023</p>
              </div>
              <div className="flex items-center text-sm font-medium text-amber-600">
                <Clock8 className="h-4 w-4 mr-1" />
                Pending
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Annual Leave</h3>
                <p className="text-sm text-muted-foreground">January 2 - January 5, 2023</p>
              </div>
              <div className="flex items-center text-sm font-medium text-red-600">
                <XCircle className="h-4 w-4 mr-1" />
                Rejected
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Placeholder component for personal details
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
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Family Information</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Relationship</th>
                    <th className="px-4 py-3 text-left font-medium">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">Jane Doe</td>
                    <td className="px-4 py-3">Spouse</td>
                    <td className="px-4 py-3">+94 77 7654321</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">Sam Doe</td>
                    <td className="px-4 py-3">Child</td>
                    <td className="px-4 py-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Work History</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Assistant Officer</div>
                <div className="text-sm text-muted-foreground">Civil Registry, Kalmunai</div>
                <div className="text-sm">March 2015 - June 2018</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Officer</div>
                <div className="text-sm text-muted-foreground">Civil Registry, Kalmunai</div>
                <div className="text-sm">June 2018 - January 2021</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Senior Officer</div>
                <div className="text-sm text-muted-foreground">Civil Registry, Kalmunai</div>
                <div className="text-sm">January 2021 - Present</div>
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
  const [activeTab, setActiveTab] = useState("leave");
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Employee Dashboard</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Welcome back, {user?.username}. Manage your employee profile and requests.
            </p>
          </div>
          
          <Tabs defaultValue="leave" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="leave" className="data-[state=active]:bg-white">
                <Calendar className="h-4 w-4 mr-2" />
                Leave Management
              </TabsTrigger>
              <TabsTrigger value="personal" className="data-[state=active]:bg-white">
                <User className="h-4 w-4 mr-2" />
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="attendance" className="data-[state=active]:bg-white">
                <Clock className="h-4 w-4 mr-2" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-white">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="leave" className="space-y-4">
              <LeaveManagement />
            </TabsContent>
            
            <TabsContent value="personal" className="space-y-4">
              <PersonalDetails />
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
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
            
            <TabsContent value="documents" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Documents Repository</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
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
            
            <TabsContent value="settings" className="space-y-4">
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
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDashboard;
