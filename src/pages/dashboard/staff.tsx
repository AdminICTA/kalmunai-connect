
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  FileText, 
  Building, 
  Settings as SettingsIcon, 
  Clock,
  CheckCircle,
  XCircle,
  UserPlus
} from "lucide-react";

// Placeholder component for stats
const StatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
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
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">189</div>
          <p className="text-xs text-muted-foreground">
            +28 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            -4 from last week
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registered Citizens</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">842</div>
          <p className="text-xs text-muted-foreground">
            +76 new this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Placeholder component for public accounts management
const PublicAccountsManagement = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Citizen Account Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Search citizens..." 
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <Button variant="ghost" size="sm" className="ml-2">
              <Users className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Register Citizen
          </Button>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">ID Number</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">Citizen {index + 1}</td>
                    <td className="px-4 py-3">9{index}12{index}5678{index}0</td>
                    <td className="px-4 py-3">citizen{index + 1}@example.com</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        index % 3 === 0 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {index % 3 === 0 ? "Pending Verification" : "Verified"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">ID Card</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Placeholder component for department forms
const DepartmentForms = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Department & Form Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <select className="px-3 py-2 border rounded-lg text-sm bg-white">
            <option>Civil Registry Department</option>
            <option>Land Administration</option>
            <option>Social Services</option>
            <option>Finance</option>
          </select>
          <Button>
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
      </CardContent>
    </Card>
  );
};

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Staff Dashboard</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Welcome back, {user?.name}. Here's your work overview.
            </p>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                <Clock className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="public-accounts" className="data-[state=active]:bg-white">
                <Users className="h-4 w-4 mr-2" />
                Public Accounts
              </TabsTrigger>
              <TabsTrigger value="department-forms" className="data-[state=active]:bg-white">
                <FileText className="h-4 w-4 mr-2" />
                Department Forms
              </TabsTrigger>
              <TabsTrigger value="employee" className="data-[state=active]:bg-white">
                <Building className="h-4 w-4 mr-2" />
                Office
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
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
            
            <TabsContent value="public-accounts" className="space-y-4">
              <PublicAccountsManagement />
            </TabsContent>
            
            <TabsContent value="department-forms" className="space-y-4">
              <DepartmentForms />
            </TabsContent>
            
            <TabsContent value="employee" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Employee Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                    <h2 className="text-xl font-medium mb-2">Access the Employee Dashboard</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Manage your personal profile, request leave, and access other employee services.
                    </p>
                    <Button onClick={() => navigate("/dashboard/employee")}>
                      Go to Employee Dashboard
                    </Button>
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
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default StaffDashboard;
