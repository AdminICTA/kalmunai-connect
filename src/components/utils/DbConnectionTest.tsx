
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from '@/services/api-config';

export function DbConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; message: string} | null>(null);
  const [database, setDatabase] = useState({
    host: 'localhost',
    name: 'dskalmun_RecApp',
    user: 'dskalmun_icta',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatabase(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testConnection = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Use the test connection endpoint from our API config
      const response = await fetch(`${API_BASE_URL}/test-connection.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(database),
      });

      const data = await response.json();
      setResult({
        success: data.success,
        message: data.message
      });
      
      console.log("Database connection test result:", data);
    } catch (error) {
      console.error("Error testing database connection:", error);
      setResult({
        success: false,
        message: 'Error connecting to database. Please check console for details.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Database Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="host">Database Host</Label>
          <Input 
            id="host" 
            name="host" 
            value={database.host} 
            onChange={handleInputChange} 
            placeholder="e.g., localhost or database.example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Database Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={database.name} 
            onChange={handleInputChange} 
            placeholder="e.g., dskalmun_RecApp"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="user">Database User</Label>
          <Input 
            id="user" 
            name="user" 
            value={database.user} 
            onChange={handleInputChange} 
            placeholder="e.g., dskalmun_icta"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Database Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            value={database.password} 
            onChange={handleInputChange} 
            placeholder="Enter database password"
          />
        </div>
        
        {result && (
          <div className={`p-3 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {result.message}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          variant={result?.success ? "default" : "destructive"}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            'Test Connection'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
