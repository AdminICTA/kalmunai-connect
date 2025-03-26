
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ENDPOINTS } from '@/services/api-config';
import { apiService } from '@/services/api-service';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConnectionResponse {
  success: boolean;
  message: string;
  connection_details?: {
    host: string;
    database: string;
    port: string;
    tables_found?: number;
    available_tables?: string[];
    server_info?: any;
  };
  error?: string;
}

export const DbConnectionTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConnectionResponse | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const testConnection = async () => {
    try {
      setIsLoading(true);
      // Get token from localStorage - ensure you're logged in
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        toast.error('Please log in first to test database connection');
        return;
      }
      
      const response = await apiService.get<ConnectionResponse>(
        ENDPOINTS.TEST.CONNECTION,
        undefined,
        { timeout: 15000 }
      );
      
      setResult(response);
      setHasRun(true);
      
      if (response.success) {
        toast.success('Successfully connected to cPanel database!');
      } else {
        toast.error('Failed to connect to database. See details for more information.');
      }
    } catch (error) {
      console.error('Connection test error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setResult({
        success: false,
        message: 'Connection test failed',
        error: errorMessage
      });
      
      toast.error('Connection test failed: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Database Connection Test</span>
          {result && (
            <Badge variant={result.success ? "success" : "destructive"}>
              {result.success ? "Connected" : "Failed"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Test the connection to your cPanel database to ensure CRUD operations will work correctly. 
          The application will use the configured database parameters to connect.
        </p>
        
        <Button 
          onClick={testConnection}
          disabled={isLoading}
          className="mb-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing connection...
            </>
          ) : "Test Database Connection"}
        </Button>
        
        {hasRun && result && (
          <div className="mt-4 space-y-4">
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertTitle>{result.success ? "Success" : "Connection Failed"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
            
            {result.connection_details && (
              <div className="border rounded-md p-4 mt-4">
                <h3 className="font-medium mb-2">Connection Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>Host: <span className="font-mono">{result.connection_details.host}</span></div>
                  <div>Database: <span className="font-mono">{result.connection_details.database}</span></div>
                  <div>Port: <span className="font-mono">{result.connection_details.port}</span></div>
                  {result.connection_details.tables_found !== undefined && (
                    <div>Tables found: <span className="font-mono">{result.connection_details.tables_found}</span></div>
                  )}
                </div>
                
                {result.connection_details.available_tables && result.connection_details.available_tables.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Available Tables:</h4>
                    <div className="bg-muted p-2 rounded text-sm font-mono max-h-40 overflow-y-auto">
                      {result.connection_details.available_tables.map((table, index) => (
                        <div key={index} className="py-1">{table}</div>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.connection_details.server_info && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Server Information:</h4>
                    <pre className="bg-muted p-2 rounded text-sm font-mono max-h-40 overflow-y-auto">
                      {JSON.stringify(result.connection_details.server_info, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
            
            {result.error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Error Details:</h3>
                <pre className="whitespace-pre-wrap text-sm">{result.error}</pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
