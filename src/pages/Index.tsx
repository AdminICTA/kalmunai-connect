
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { SmsTest } from '@/components/tests/SmsTest';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <Logo className="h-24 w-auto mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">Kalmunai Divisional Secretariat</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          Welcome to the official portal of the Kalmunai Divisional Secretariat. This application provides services for the public, staff, and administrators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>For Public</CardTitle>
            <CardDescription>Access public services and information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Register for public services, track your applications, and more.</p>
            <Button asChild className="w-full">
              <Link to="/dashboard/public">Public Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Staff</CardTitle>
            <CardDescription>Staff portal for day-to-day operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage applications, users, and department-specific functions.</p>
            <Button asChild className="w-full">
              <Link to="/dashboard/staff">Staff Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Administrators</CardTitle>
            <CardDescription>Admin controls and system management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Configure system settings, manage staff accounts, and oversee operations.</p>
            <Button asChild className="w-full">
              <Link to="/dashboard/admin">Admin Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Test SMS Service</h2>
        <p className="text-center text-gray-600 mb-6">
          Use this form to test the SMS service integration with SMSLenz
        </p>
        <SmsTest />
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Kalmunai Divisional Secretariat. All rights reserved.</p>
        <p className="mt-2">Technical support: <a href="mailto:support@dskalmunai.lk" className="underline">support@dskalmunai.lk</a></p>
      </footer>
    </div>
  );
};

export default Index;
