
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  Settings as SettingsIcon, 
  BarChart3, 
  PieChart,
  TrendingUp,
  UserPlus
} from "lucide-react";

// Placeholder component for stats
const StatsGrid = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className={`glass-card ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,284</div>
          <p className="text-xs text-muted-foreground">
            +180 from last month
          </p>
        </CardContent>
      </Card>
      <Card className={`glass-card ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            +4 new staff this month
          </p>
        </CardContent>
      </Card>
      <Card className={`glass-card ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            All departments active
          </p>
        </CardContent>
      </Card>
      <Card className={`glass-card ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
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

// Placeholder component for staff management
const StaffManagement = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Staff Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <Button variant="ghost" size="sm" className="ml-2">
              <Users className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Department</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">Staff Member {index + 1}</td>
                    <td className="px-4 py-3">staff{index + 1}@kalmunai.lk</td>
                    <td className="px-4 py-3">{["Civil Registry", "Land", "Finance", "Social Services", "Admin"][index]}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Suspend</Button>
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

// Placeholder component for department management
const DepartmentManagement = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Department & Division Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Search departments..." 
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <Button>
            <Building2 className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Civil Registry", "Land Administration", "Finance", "Social Services"].map((dept, index) => (
            <Card key={index} className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{dept}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  {index + 2} divisions • {index + 5} staff • {(index + 2) * 3} forms
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Manage Forms</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main dashboard component
const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Admin Dashboard</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Welcome back, {user?.name}. Here's what's happening with the system.
            </p>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="staff" className="data-[state=active]:bg-white">
                <Users className="h-4 w-4 mr-2" />
                Staff Management
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-white">
                <Building2 className="h-4 w-4 mr-2" />
                Departments
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <StatsGrid />
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="glass-card col-span-4">
                  <CardHeader>
                    <CardTitle>Service Requests Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card col-span-3">
                  <CardHeader>
                    <CardTitle>Department Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <PieChart className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4">
              <StaffManagement />
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-4">
              <DepartmentManagement />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
