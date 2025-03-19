
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  User, 
  FileText, 
  History, 
  Settings as SettingsIcon,
  Building,
  ArrowRight,
  Clock
} from "lucide-react";

// Placeholder data for services departments
const departments = [
  {
    name: "Civil Registry",
    icon: FileText,
    services: [
      "Birth Certificate",
      "Death Certificate",
      "Marriage Certificate",
      "ID Card Application"
    ]
  },
  {
    name: "Land Administration",
    icon: Building,
    services: [
      "Land Ownership Certificate",
      "Property Transfer",
      "Land Disputes",
      "Building Permits"
    ]
  },
  {
    name: "Social Services",
    icon: User,
    services: [
      "Financial Assistance",
      "Community Development",
      "Elder Care Services",
      "Youth Programs"
    ]
  }
];

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

// Services component
const ServicesComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Select a department below to request services and fill out forms.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.name} className="glass-card group hover:border-primary/50 transition-all">
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
                  <li key={service} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></div>
                    {service}
                  </li>
                ))}
              </ul>
              <Button className="w-full group-hover:bg-primary/90 transition-colors">
                Access Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// History component
const HistoryComponent = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Service History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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

// User profile component
const ProfileComponent = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Personal Profile</CardTitle>
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
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main public dashboard component
const PublicDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("services");
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Citizen Portal</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Welcome, {user?.username}. Access government services and track your applications.
            </p>
          </div>
          
          <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="services" className="data-[state=active]:bg-white">
                <Building className="h-4 w-4 mr-2" />
                Services
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-white">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
                <Clock className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="space-y-4">
              <ServicesComponent />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <HistoryComponent />
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-4">
              <ProfileComponent />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex p-4 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Birth Certificate Application Update</h3>
                        <p className="text-sm text-muted-foreground">Your application has been processed and is ready for collection.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex p-4 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Profile Verification</h3>
                        <p className="text-sm text-muted-foreground">Your profile has been successfully verified.</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex p-4 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                        <Building className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">New Service Available</h3>
                        <p className="text-sm text-muted-foreground">A new online service for property tax payments is now available.</p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
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

export default PublicDashboard;
