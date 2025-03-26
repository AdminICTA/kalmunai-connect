import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/auth-context";
import { RegisterModal } from "@/components/registration/register-modal";
import { 
  ChevronRight, 
  FileText, 
  UserCheck, 
  Building, 
  Users, 
  Mail, 
  Phone,
  Map,
  Clock,
  ArrowDown,
  ExternalLink,
  LogIn
} from "lucide-react";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Create refs for each section
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Updated scrollToSection function to handle different element types
  const scrollToSection = (ref: React.RefObject<HTMLElement> | { current: HTMLElement | null }) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Services data
  const services = [
    {
      title: "Birth Certificates",
      description: "Apply for new birth certificates or get certified copies of existing records.",
      icon: FileText,
      href: "/services/birth-certificates",
    },
    {
      title: "ID Card Applications",
      description: "Apply for new national identity cards or report lost/damaged cards.",
      icon: UserCheck,
      href: "/services/id-applications",
    },
    {
      title: "Land Registry",
      description: "Register property transfers, obtain land ownership certificates and more.",
      icon: Building,
      href: "/services/land-registry",
    },
    {
      title: "Community Services",
      description: "Access community development programs and social welfare services.",
      icon: Users,
      href: "/services/community",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section with Sign In Button */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sidebar/40 to-sidebar-primary/30 z-0"></div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="inline-block rounded-lg bg-sidebar-accent/90 px-3 py-1 text-sm text-sidebar-accent-foreground font-medium">
                Official Government Portal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Divisional Secretariat
                <span className="block text-sidebar-primary mt-2">Kalmunai</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Streamlined government services for citizens, businesses, and government employees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    onClick={() => navigate(`/dashboard/${user?.role_id?.toLowerCase()}`)}
                    className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/login")}
                      className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
                    >
                      Sign In
                      <LogIn className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => scrollToSection(servicesRef)}
                      className="border-sidebar-primary text-sidebar-primary hover:bg-sidebar-primary/10"
                    >
                      View Services
                    </Button>
                  </>
                )}
              </div>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection(servicesRef)}
                className="text-sidebar-primary animate-bounce"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </div>
            <div className={`flex justify-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-sidebar-accent/50 to-white/90 shadow-glass animate-pulse"></div>
                <img 
                  src="https://www.dskalmunai.gov.lk/wp-content/uploads/2022/06/cropped-LOGO_d.png" 
                  alt="Divisional Secretariat - Kalmunai" 
                  className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-gradient-to-br from-white to-sidebar-accent/10">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-muted-foreground">
              We provide a range of essential government services to support citizens and businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={service.title} className={`glass-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-sidebar-accent/20 ${mounted ? `fade-up-delay-${index + 1}` : 'opacity-0'}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-sidebar-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-sidebar-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Button 
                    variant="link" 
                    asChild
                    className="p-0 text-sidebar-primary hover:text-sidebar-primary/80"
                  >
                    <Link to={service.href}>
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 bg-gradient-to-br from-secondary/5 to-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">About Kalmunai Divisional Secretariat</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Divisional Secretariat of Kalmunai is a key government administrative center 
                  serving the citizens of Kalmunai and surrounding areas.
                </p>
                <p>
                  Established in 1984, our mission is to provide efficient and accessible government 
                  services to all citizens while promoting community development and welfare.
                </p>
                <p>
                  Our dedicated staff works across multiple departments to handle vital registrations, 
                  land administration, social services, and financial assistance programs.
                </p>
              </div>
              <div className="mt-6">
                <Button 
                  className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
                  onClick={() => navigate("/documentation")}
                >
                  Learn More About Us
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-sidebar-accent/30 rounded-xl blur-xl opacity-70"></div>
              <Card className="relative z-10 overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" 
                    alt="Kalmunai Divisional Secretariat Building" 
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-gradient-to-br from-sidebar-accent/10 to-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            <p className="mt-4 text-muted-foreground">
              We're here to assist you. Reach out to us through any of the following channels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card shadow-md hover:shadow-lg transition-all duration-300 border-sidebar-accent/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sidebar-primary/10 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-sidebar-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Our Location</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Divisional Secretariat Office<br />
                  Main Street, Kalmunai<br />
                  Eastern Province, Sri Lanka
                </p>
                <Button 
                  variant="link" 
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                  className="p-0 text-sidebar-primary hover:text-sidebar-primary/80"
                >
                  View on Map
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card shadow-md hover:shadow-lg transition-all duration-300 border-sidebar-accent/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sidebar-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-sidebar-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Phone & Email</h3>
                <p className="text-muted-foreground text-sm mb-1">
                  <strong>Main Office:</strong> +94 67 2229047
                </p>
                <p className="text-muted-foreground text-sm mb-1">
                  <strong>Support:</strong> +94 67 2229048
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Email:</strong> info@dskalmunai.lk
                </p>
                <Button 
                  variant="link" 
                  onClick={() => window.location.href = "mailto:info@dskalmunai.lk"}
                  className="p-0 text-sidebar-primary hover:text-sidebar-primary/80"
                >
                  Send Email
                  <Mail className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card shadow-md hover:shadow-lg transition-all duration-300 border-sidebar-accent/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sidebar-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-sidebar-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Office Hours</h3>
                <p className="text-muted-foreground text-sm mb-1">
                  <strong>Monday-Friday:</strong> 8:30 AM - 4:30 PM
                </p>
                <p className="text-muted-foreground text-sm mb-1">
                  <strong>Saturday:</strong> 9:00 AM - 1:00 PM
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Sunday & Holidays:</strong> Closed
                </p>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/contact")}
                  className="p-0 text-sidebar-primary hover:text-sidebar-primary/80"
                >
                  Special Appointments
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Sign In Button */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-sidebar to-sidebar-primary rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-sidebar-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Access Government Services</h2>
              <p className="text-sidebar-foreground/90 mb-6 max-w-lg">
                Sign in to your account to access all government services with ease.
                Apply online and visit our office for verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                >
                  Sign In
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setRegisterModalOpen(true)}
                  className="border-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/10"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <RegisterModal 
        open={registerModalOpen} 
        onOpenChange={setRegisterModalOpen} 
      />
    </MainLayout>
  );
};

export default Index;
