
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      
      // Navigate based on user role (this will happen in the background via ProtectedRoute)
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info column */}
          <div className="flex flex-col justify-center space-y-8 p-8 bg-muted/50 rounded-xl">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to access government services
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">1</span>
                </div>
                <p className="text-sm">Staff users can access office management features</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">2</span>
                </div>
                <p className="text-sm">Public users can apply for services and track applications</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">3</span>
                </div>
                <p className="text-sm">Admin users manage the entire system and user permissions</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
          </div>
          
          {/* Form column */}
          <div className="flex flex-col justify-center p-8">
            <div className="mx-auto w-full max-w-sm space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials below to sign in
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="admin@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                      Hint: Use email containing 'admin', 'staff', 'employee', or anything else for public access
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/")}>
                    Contact administrator
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
