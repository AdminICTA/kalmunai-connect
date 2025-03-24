
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Scan, X } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/logo";
import { QrScanner } from "@/components/qr/qr-scanner";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(usernameOrEmail, password);
      toast.success("Login successful");
      // Navigation is handled by auth-context after successful login
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQrSuccess = async (qrCode: string) => {
    setIsScanning(false);
    setIsLoading(true);
    
    try {
      // Format expected: "User:<username>:<password>" or just the QR code for public users
      if (qrCode.startsWith("User:")) {
        const parts = qrCode.split(":");
        if (parts.length >= 3) {
          const username = parts[1];
          const password = parts[2];
          await login(username, password);
          toast.success("Login successful via QR code");
        } else {
          toast.error("Invalid QR code format");
        }
      } else {
        // For public users, we can just use the QR code as an identifier
        await login(qrCode, "qrlogin");
        toast.success("Login successful via ID Card");
      }
    } catch (error) {
      toast.error("QR code login failed. Please try again.");
      console.error("QR login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout hideBackButton={true}>
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border">
          <div className="text-center">
            <Link to="/" className="absolute top-4 left-4 text-kalmunai-teal hover:text-kalmunai-darkNavy">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex flex-col items-center justify-center mb-6">
              <Logo size="md" withText={true} />
            </div>
            <h2 className="text-2xl font-bold text-kalmunai-darkNavy">Sign In</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-sm text-kalmunai-teal font-medium">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div>
                  <p className="font-semibold">Admin:</p>
                  <p>Username: ICTA</p>
                  <p>Password: admin123</p>
                </div>
                <div>
                  <p className="font-semibold">Staff:</p>
                  <p>Username: Staff</p>
                  <p>Password: staff123</p>
                </div>
                <div className="col-span-2 mt-1">
                  <p className="font-semibold">User:</p>
                  <p>Username: User</p>
                  <p>Password: user123</p>
                </div>
              </div>
            </div>
          </div>
          
          {isScanning ? (
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-0 top-0 z-10" 
                onClick={() => setIsScanning(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <QrScanner onScan={handleQrSuccess} />
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Username or Email</Label>
                <Input
                  id="usernameOrEmail"
                  placeholder="Enter your username or email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-kalmunai-teal hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-kalmunai hover:bg-kalmunai-teal text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full" 
                  onClick={() => setIsScanning(true)}
                >
                  <Scan className="mr-2 h-4 w-4" />
                  Scan ID Card
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-kalmunai-teal hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
