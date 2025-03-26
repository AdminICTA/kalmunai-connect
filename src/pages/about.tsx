
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Kalmunai Divisional Secretariat</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            The Kalmunai Divisional Secretariat serves as the primary administrative unit for the Kalmunai region,
            providing essential government services to the local population.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            To provide efficient, transparent, and citizen-centered services that enhance the quality of life for all
            residents in the Kalmunai Division through effective implementation of government policies and programs.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            To be a model divisional secretariat that exemplifies excellence in public service delivery, community
            development, and administrative efficiency.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">History</h2>
          <p>
            The Kalmunai Divisional Secretariat was established as part of Sri Lanka's administrative reorganization
            to bring government services closer to the people. Over the years, it has evolved to address the changing
            needs of the community while preserving its commitment to public service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Our dedicated staff consists of experienced civil servants committed to serving the public with integrity,
            efficiency, and compassion. The team is led by the Divisional Secretary and includes specialized officers
            for various departments.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
