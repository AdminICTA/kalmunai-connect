
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/auth-context";
import { ChevronRight, FileText, UserCheck, Buildings, Users } from "lucide-react";

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
    icon: Buildings,
    href: "/services/land-registry",
  },
  {
    title: "Community Services",
    description: "Access community development programs and social welfare services.",
    icon: Users,
    href: "/services/community",
  },
];

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kalmunai-blue/10 to-kalmunai-green/5 z-0"></div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="inline-block rounded-lg bg-kalmunai-blue/10 px-3 py-1 text-sm text-kalmunai-blue">
                Official Government Portal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Divisional Secretariat
                <span className="block text-kalmunai-blue mt-2">Kalmunai</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Streamlined government services for citizens, businesses, and government employees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    onClick={() => navigate(`/dashboard/${user?.role}`)}
                    className="bg-kalmunai-blue hover:bg-kalmunai-blue/90 text-white"
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/login")}
                      className="bg-kalmunai-blue hover:bg-kalmunai-blue/90 text-white"
                    >
                      Sign In
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => navigate("/services")}
                    >
                      View Services
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className={`flex justify-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-kalmunai-light to-white/50 shadow-glass animate-pulse"></div>
                <img 
                  src="/lovable-uploads/logo.png" 
                  alt="Divisional Secretariat - Kalmunai" 
                  className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-muted-foreground">
              We provide a range of essential government services to support citizens and businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={service.title} className={`glass-card rounded-xl overflow-hidden ${mounted ? `fade-up-delay-${index + 1}` : 'opacity-0'}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-kalmunai-blue/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-kalmunai-blue" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Link 
                    to={service.href}
                    className="inline-flex items-center text-sm font-medium text-kalmunai-blue hover:text-kalmunai-blue/80"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-kalmunai-blue to-kalmunai-navy rounded-xl overflow-hidden shadow-glass">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Your Digital ID Today</h2>
              <p className="text-blue-100 mb-6 max-w-lg">
                Register for a digital ID to access all government services with ease. 
                Apply online and visit our office for verification.
              </p>
              <Button 
                onClick={() => navigate("/login")}
                className="bg-white text-kalmunai-blue hover:bg-blue-50"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
