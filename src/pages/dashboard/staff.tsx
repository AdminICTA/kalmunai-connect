
import { useAuth } from "@/auth/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TabsContent } from "@/components/ui/tabs";
import { BarChart3, Users, Scan } from "lucide-react";

// Import refactored components
import StatsGrid from "@/components/dashboard/staff/StatsGrid";
import PublicUserManagement from "@/components/dashboard/staff/PublicUserManagement";
import ScanQrCode from "@/components/dashboard/staff/ScanQrCode";

// Main staff dashboard component
const StaffDashboard = () => {
  const { user } = useAuth();
  
  // Define the menu items
  const menuItems = [
    { label: "Overview", icon: BarChart3, value: "overview" },
    { label: "Public Users", icon: Users, value: "users" },
    { label: "Scan QR", icon: Scan, value: "scan" },
  ];
  
  return (
    <DashboardLayout 
      title="Staff Dashboard" 
      subtitle={`Welcome, ${user?.username}. Manage public users and services.`}
      menu={menuItems}
    >
      <TabsContent value="overview" className="space-y-6 mt-2">
        <StatsGrid />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6 mt-2">
        <PublicUserManagement />
      </TabsContent>
      
      <TabsContent value="scan" className="space-y-6 mt-2">
        <ScanQrCode />
      </TabsContent>
    </DashboardLayout>
  );
};

export default StaffDashboard;
