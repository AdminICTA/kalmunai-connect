
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { MainLayout } from '@/components/layout/main-layout';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Shield, User, Users, Server, Smartphone, Search } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout hideBackButton>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Kalmunai <span className="text-primary">Secretariat</span> Digital Services
              </h1>
              <p className="text-xl text-slate-600 max-w-xl">
                Secure and efficient digital services for the citizens of Kalmunai. Access government services, manage applications, and more.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  <Link to="/login">Sign In <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Link to="/register">Register Now</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pt-4 text-sm text-slate-500">
                <Lock className="h-4 w-4" />
                <span>Secured with advanced encryption and authentication</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform rotate-3"></div>
                <img 
                  src="/lovable-uploads/f9d91d29-5e98-4f4b-a7ed-c27a7e3fa97d.png" 
                  alt="Secure Digital Services" 
                  className="relative z-10 rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-secondary/20 rounded-full"></div>
                <div className="absolute -top-8 right-1/3 h-16 w-16 bg-primary/20 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Access Your Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose your portal and access the services designed specifically for you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="space-y-1 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">For Citizens</CardTitle>
                  <CardDescription className="text-slate-600">Access public services and digital ID</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 mb-6">Register for public services, track your applications, and access secure digital ID services.</p>
                  <Button asChild className="w-full text-primary hover:text-white border-2 border-primary/50 hover:border-primary hover:bg-primary bg-transparent transition-all duration-300">
                    <Link to="/dashboard/public">
                      Access Citizen Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="space-y-1 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-2 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">For Staff</CardTitle>
                  <CardDescription className="text-slate-600">Manage day-to-day operations</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 mb-6">Manage applications, user profiles, and handle department-specific functions efficiently.</p>
                  <Button asChild className="w-full text-secondary hover:text-white border-2 border-secondary/50 hover:border-secondary hover:bg-secondary bg-transparent transition-all duration-300">
                    <Link to="/dashboard/staff">
                      Access Staff Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="space-y-1 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">For Administrators</CardTitle>
                  <CardDescription className="text-slate-600">System administration and oversight</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 mb-6">Configure system settings, manage staff accounts, and oversee all operations.</p>
                  <Button asChild className="w-full text-primary hover:text-white border-2 border-primary/50 hover:border-primary hover:bg-primary bg-transparent transition-all duration-300">
                    <Link to="/dashboard/admin">
                      Access Admin Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Key Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform offers a range of modern digital services to enhance your experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-slate-600">Advanced encryption and multi-factor authentication to keep your data safe</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Smartphone className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-slate-600">Access all services from any device with our responsive application</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
              <p className="text-slate-600">Track your applications and requests with our intuitive status monitoring</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of citizens already using our digital services platform
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                <Link to="/services">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom footer is already in MainLayout */}
    </MainLayout>
  );
};

export default Index;
