
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/auth-context";
import { AtSign, Lock, ArrowLeft } from "lucide-react";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2640] to-[#2F4D66] p-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={24} />
      </Button>
      
      <div className="w-full max-w-5xl bg-[#1A2640] rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-transparent border-2 border-[#5CA9AF] rounded-full flex items-center justify-center mb-6">
              <div className="text-[#5CA9AF]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5CA9AF]">
                  <AtSign size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="Username"
                  className="pl-10 bg-transparent border-[#5CA9AF]/30 text-white focus:border-[#DA4E5A] focus:ring-[#DA4E5A]"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5CA9AF]">
                  <Lock size={18} />
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-transparent border-[#5CA9AF]/30 text-white focus:border-[#DA4E5A] focus:ring-[#DA4E5A]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 h-4 w-4 accent-[#DA4E5A]"
                />
                <label htmlFor="rememberMe" className="text-[#5CA9AF]">Remember me</label>
              </div>
              <a href="#" className="text-[#5CA9AF] hover:text-[#DA4E5A]" onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Password Reset",
                  description: "Please contact your administrator to reset your password",
                });
              }}>
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#DA4E5A] hover:bg-[#DA4E5A]/90 text-white py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "LOGIN"}
            </Button>
          </form>
          
          <div className="mt-8 hidden">
            <p className="text-xs text-white/60">Available test accounts:</p>
            <ul className="text-xs text-white/60 mt-1">
              <li>icta@dskalmunai.com / 1993</li>
              <li>farhana@dskalmunai.com / 0726</li>
              <li>marliya@dskalmunai.com / 1966</li>
              <li>maya@dskalmunai.com / 1991</li>
            </ul>
          </div>
        </div>
        
        {/* Right Side - Welcome Content */}
        <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-[#1A2640] to-[#2F4D66] p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5CA9AF]/30 to-[#DA4E5A]/30"></div>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4">
              <path fill="#5CA9AF" d="M47.7,-57.5C59.5,-47.5,65.9,-30.3,67.2,-13.5C68.5,3.3,64.6,19.7,55.8,32C46.9,44.3,33,52.6,17.7,57.5C2.3,62.4,-14.4,64,-31.9,59.1C-49.3,54.2,-67.4,42.9,-74.9,26.3C-82.3,9.7,-79,-12.2,-69.3,-28.8C-59.6,-45.4,-43.6,-56.8,-27.6,-64.6C-11.6,-72.3,4.3,-76.5,21.1,-73C37.8,-69.5,55.5,-58.3,47.7,-57.5Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="z-10 flex flex-col items-start justify-center text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome.</h1>
            <p className="text-lg mb-8 max-w-md opacity-80">
              Sign in to access the Divisional Secretariat - Kalmunai services portal. Manage your account and access government services efficiently.
            </p>
            
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <span>Not a member?</span>
              <a className="text-[#DA4E5A] underline" href="#" onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Registration",
                  description: "Please contact your administrator to create an account",
                });
              }}>Sign up now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
