
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Scan, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import refactored components
import StatsGrid from "@/components/dashboard/staff/StatsGrid";
import PublicUserManagement from "@/components/dashboard/staff/PublicUserManagement";
import ScanQrCode from "@/components/dashboard/staff/ScanQrCode";

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Public Users", icon: Users, value: "users" },
    { label: "Scan QR", icon: Scan, value: "scan" },
  ];
  
  const handleStaffDetailsClick = () => {
    navigate("/staff-details");
  };
  
  return (
    <DashboardLayout 
      title="Staff Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage public users and services.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <div className="flex justify-end mb-4">
          <Button onClick={handleStaffDetailsClick} className="bg-blue-600 hover:bg-blue-700">
            <UserCog className="h-4 w-4 mr-2" />
            Staff Details
          </Button>
        </div>
        <StatsGrid />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6 mt-2">
        <div className="flex justify-end mb-4">
          <Button onClick={handleStaffDetailsClick} className="bg-blue-600 hover:bg-blue-700">
            <UserCog className="h-4 w-4 mr-2" />
            Staff Details
          </Button>
        </div>
        <PublicUserManagement />
      </TabsContent>
      
      <TabsContent value="scan" className="space-y-6 mt-2">
        <div className="flex justify-end mb-4">
          <Button onClick={handleStaffDetailsClick} className="bg-blue-600 hover:bg-blue-700">
            <UserCog className="h-4 w-4 mr-2" />
            Staff Details
          </Button>
        </div>
        <ScanQrCode />
      </TabsContent>
    </DashboardLayout>
  );
};

export default StaffDashboard;
