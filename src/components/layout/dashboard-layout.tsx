
import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { useAuth } from "@/auth/auth-context";
import { Card } from "@/components/ui/card";
import { LogOut, Menu, X, Home } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserProfile } from "@/components/ui/user-profile";
import { useUser } from "@/contexts/user-context";

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
  const { username } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(menu[0]?.value || "");
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set initial active tab based on URL hash if present
  useEffect(() => {
    if (location.hash) {
      const tabValue = location.hash.replace('#', '');
      if (menu.some(item => item.value === tabValue)) {
        setActiveTab(tabValue);
      }
    }
  }, [location.hash, menu]);

  // Update URL hash when active tab changes
  useEffect(() => {
    if (activeTab) {
      // Update URL hash without triggering navigation
      window.history.replaceState(null, '', `#${activeTab}`);
    }
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsSidebarOpen(false); // Close mobile sidebar when tab changes
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setIsSidebarOpen(false);
  };

  // Function to filter children based on active tab
  const filterChildrenByTab = (children: ReactNode): ReactNode => {
    // If children is an array, find the child with the matching tab value
    if (Array.isArray(children)) {
      const activeChild = children.find(
        (child) => {
          if (typeof child === 'object' && child !== null && 'props' in child) {
            return 'value' in child.props && child.props.value === activeTab;
          }
          return false;
        }
      );
      return activeChild || children[0];
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-primary text-white p-4 shadow-lg hidden md:block">
          <div className="flex items-center justify-center mb-8 pt-2">
            <Logo className="scale-90" />
          </div>

          {/* User profile info in sidebar */}
          <div className="mb-6 p-3 bg-white/10 rounded-lg text-center">
            <p className="font-medium text-white">Welcome, {username}</p>
            <p className="text-xs text-white/70">Logged in</p>
          </div>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mb-4"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          
            {menu.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  activeTab === item.value
                    ? "bg-secondary text-secondary-foreground"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => handleTabChange(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
            
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mt-4"
              onClick={handleSettingsClick}
            >
              <Menu className="mr-2 h-4 w-4" />
              Settings
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mt-2"
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
            <div className="flex items-center gap-3">
              <BackButton
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 p-2"
              />
              <Logo className="scale-75" />
            </div>
            
            <div className="flex items-center space-x-2">
              <UserProfile />
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-primary text-white w-64">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <Logo className="scale-75" />
                      <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                        <X className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                    
                    {/* User profile info in mobile sidebar */}
                    <div className="mb-6 p-3 bg-white/10 rounded-lg text-center">
                      <p className="font-medium text-white">Welcome, {username}</p>
                      <p className="text-xs text-white/70">Logged in</p>
                    </div>
                    
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mb-4"
                        onClick={() => {
                          navigate("/");
                          setIsSidebarOpen(false);
                        }}
                      >
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                      
                      {menu.map((item) => (
                        <Button
                          key={item.value}
                          variant={activeTab === item.value ? "secondary" : "ghost"}
                          className={`w-full justify-start text-left ${
                            activeTab === item.value
                              ? "bg-secondary text-secondary-foreground"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                          onClick={() => handleTabChange(item.value)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      ))}
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mt-4"
                        onClick={handleSettingsClick}
                      >
                        <Menu className="mr-2 h-4 w-4" />
                        Settings
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-white/80 hover:text-white hover:bg-white/10 mt-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden md:flex items-center justify-between p-4 bg-white/50 border-b">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
            <UserProfile />
          </header>

          {/* Page Title for Mobile */}
          <div className="p-4 md:hidden bg-accent/5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6">
            <Card className="bg-white/90 backdrop-blur-sm border shadow-md p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                {children}
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
