
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/auth-context";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  menu: {
    label: string;
    icon: React.ElementType;
    value: string;
  }[];
}

export const DashboardLayout = ({
  children,
  title,
  subtitle,
  menu,
}: DashboardLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(menu[0]?.value || "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Function to filter children based on active tab
  const filterChildrenByTab = (children: ReactNode): ReactNode => {
    // If children is an array, find the child with the matching tab value
    if (Array.isArray(children)) {
      const activeChild = children.find(
        (child) => 
          React.isValidElement(child) && 
          child.props.value === activeTab
      );
      return activeChild || children[0];
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-primary text-white p-4 shadow-lg hidden md:block">
          <div className="flex items-center justify-center mb-8 pt-2">
            <Logo className="scale-90" />
          </div>
          
          <div className="space-y-1">
            {menu.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  activeTab === item.value
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
            
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mt-8"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header with menu button */}
          <header className="md:hidden bg-primary text-white p-4 flex items-center justify-between">
            <Logo className="scale-75" />
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </header>

          {/* Mobile Navigation */}
          <div className="md:hidden p-4 bg-accent/10 overflow-x-auto">
            <div className="flex space-x-2">
              {menu.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "outline"}
                  size="sm"
                  className={activeTab === item.value ? "bg-primary text-white" : ""}
                  onClick={() => setActiveTab(item.value)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Page Title */}
          <div className="p-6 bg-accent/5">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <Card className="bg-white/90 backdrop-blur-sm border shadow-md p-6">
              {filterChildrenByTab(children)}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
