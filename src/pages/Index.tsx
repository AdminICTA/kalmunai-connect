
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { SmsTest } from '@/components/tests/SmsTest';
import { DbConnectionTest } from '@/components/utils/DbConnectionTest';
import { MainLayout } from '@/components/layout/main-layout';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <MainLayout hideBackButton>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Logo className="h-16 w-auto mb-8" />
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                Kalmunai Divisional <span className="text-primary">Secretariat</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                Welcome to the official portal. Access digital services, manage applications, and connect with administrators - all in one place.
              </p>
              <div className="flex gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/dashboard/public">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/services">View Services</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Digital Services" 
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/10 rounded-full"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 bg-slate-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Access Your Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose your portal and access the services designed specifically for you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-none bg-white">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">For Public</CardTitle>
                <CardDescription className="text-slate-600">Access public services and information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">Register for public services, track your applications, and access digital ID services.</p>
                <Button asChild className="w-full bg-white hover:bg-slate-50 text-primary border-2 border-primary">
                  <Link to="/dashboard/public">Access Public Portal</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-none bg-white">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2 group-hover:bg-secondary/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">For Staff</CardTitle>
                <CardDescription className="text-slate-600">Staff portal for day-to-day operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">Manage applications, users, and handle department-specific functions efficiently.</p>
                <Button asChild className="w-full bg-white hover:bg-slate-50 text-secondary border-2 border-secondary">
                  <Link to="/dashboard/staff">Access Staff Portal</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-none bg-white">
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">For Administrators</CardTitle>
                <CardDescription className="text-slate-600">Admin controls and system management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">Configure system settings, manage staff accounts, and oversee all operations.</p>
                <Button asChild className="w-full bg-white hover:bg-slate-50 text-primary border-2 border-primary">
                  <Link to="/dashboard/admin">Access Admin Portal</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Quick Links</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our range of services and learn more about our organization
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="w-full h-auto py-6 px-4 bg-white hover:bg-slate-50 border-2 border-primary/20 hover:border-primary transition-colors duration-300"
              >
                <Link to="/services" className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-lg font-medium text-slate-800">Services</span>
                  <span className="text-sm text-slate-600">View all available services</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="w-full h-auto py-6 px-4 bg-white hover:bg-slate-50 border-2 border-secondary/20 hover:border-secondary transition-colors duration-300"
              >
                <Link to="/about" className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-lg font-medium text-slate-800">About Us</span>
                  <span className="text-sm text-slate-600">Learn about our organization</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="w-full h-auto py-6 px-4 bg-white hover:bg-slate-50 border-2 border-primary/20 hover:border-primary transition-colors duration-300"
              >
                <Link to="/contact" className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg font-medium text-slate-800">Contact</span>
                  <span className="text-sm text-slate-600">Get in touch with us</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">Test SMS Service</h2>
                <p className="text-lg text-slate-600 text-center mb-8">
                  Use this form to test the SMS service integration with SMSLenz
                </p>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <SmsTest />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">System Status</h2>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <DbConnectionTest />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Logo className="h-8 w-auto mb-4 brightness-0 invert" />
              <div className="text-slate-400 text-sm text-center">
                <p>© {new Date().getFullYear()} Kalmunai Divisional Secretariat. All rights reserved.</p>
                <p className="mt-2">Technical support: <a href="mailto:support@dskalmunai.lk" className="text-white hover:text-primary transition-colors duration-300">support@dskalmunai.lk</a></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default Index;
