
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/auth/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(usernameOrEmail, password);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout hideBackButton={true}>
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border">
          <div className="text-center">
            <Link to="/" className="absolute top-4 left-4 text-primary hover:text-primary/80">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-primary">Sign In</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
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
                <a href="#" className="text-sm text-primary hover:underline">
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
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
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
