
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/auth-context";
import { LockKeyhole, AtSign, ArrowRight } from "lucide-react";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usernameOrEmail || !password) {
      toast({
        title: "Error",
        description: "Please enter both username/email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(usernameOrEmail, password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      
      // Navigate based on user role (this will happen in the background via ProtectedRoute)
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid username/email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container min-h-[calc(100vh-16rem)] py-12">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-xl">
          {/* Left column - Image and Text */}
          <div 
            className="flex flex-col justify-center p-8 text-white relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #13272E 0%, #487674 100%)"
            }}
          >
            <div className="absolute inset-0 opacity-20 bg-pattern"></div>
            <div className="relative z-10 space-y-6">
              <Logo size="lg" />
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to Kalmunai DS</h1>
                <p className="text-teal-100">
                  Sign in to access government services
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-8">
                <div style={{ background: "#13272E" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #13272E
                </div>
                <div style={{ background: "#487674" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #487674
                </div>
                <div style={{ background: "#83B4AE" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #83B4AE
                </div>
                <div style={{ background: "#E8C69B" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #E8C69B
                </div>
                <div style={{ background: "#D69369" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #D69369
                </div>
                <div style={{ background: "#CB6330" }} className="h-10 rounded flex items-center justify-center text-xs">
                  #CB6330
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Login Form */}
          <div className="flex flex-col justify-center p-8 bg-white">
            <div className="mx-auto w-full max-w-sm space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials below to access your account
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="usernameOrEmail">Username or Email</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="usernameOrEmail"
                        placeholder="icta@dskalmunai.com"
                        type="text"
                        className="pl-10"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#" 
                        className="text-xs text-teal-600 hover:text-teal-700"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Password Reset",
                            description: "Please contact your administrator to reset your password",
                          });
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full gap-2 bg-gradient-to-r from-[#13272E] to-[#487674] hover:from-[#13272E] hover:to-[#487674] hover:opacity-90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-[#CB6330]" onClick={() => navigate("/")}>
                    Contact administrator
                  </Button>
                </p>
              </div>
              
              {/* Login Hints */}
              <div className="rounded-lg bg-slate-50 p-4 text-sm">
                <p className="font-medium mb-2 text-slate-700">Available test accounts:</p>
                <ul className="space-y-1 text-slate-500 text-xs">
                  <li><strong>Admin:</strong> icta@dskalmunai.com / 1993</li>
                  <li><strong>Admin:</strong> farhana@dskalmunai.com / 0726</li>
                  <li><strong>User:</strong> marliya@dskalmunai.com / 1966</li>
                  <li><strong>User:</strong> maya@dskalmunai.com / 1991</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
