
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Birth Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Apply for new birth certificates or get copies of existing ones.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Marriage Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Apply for marriage registration or obtain marriage certificates.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Residence Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Apply for official residence certification documents.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Land Permits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Apply for land permits and related documentation.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Register new businesses or update existing business information.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Social Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Access various social welfare and support programs.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
