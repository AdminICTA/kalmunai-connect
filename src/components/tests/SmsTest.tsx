
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { smsLenzService } from '@/services/sms-lenz-service';

export const SmsTest = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSendSMS = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }

    if (!message) {
      toast.error('Please enter a message');
      return;
    }

    setIsSending(true);
    try {
      // Use the SMS Lenz service to send a message
      const response = await smsLenzService.sendSMS(phoneNumber, message);
      setResult(response);
      
      if (response.success) {
        toast.success('SMS sent successfully!');
      } else {
        toast.error('Failed to send SMS: ' + response.message);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error('Error sending SMS');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>SMS Service Test</CardTitle>
        <CardDescription>
          Send a test SMS using SMSLenz service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            placeholder="+94XXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-500">Format: +94XXXXXXXXX (Sri Lankan format)</p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <Input
            id="message"
            placeholder="Your test message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <h4 className="font-medium">Response:</h4>
            <pre className="text-xs overflow-auto mt-1">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSendSMS} 
          disabled={isSending} 
          className="w-full"
        >
          {isSending ? 'Sending...' : 'Send Test SMS'}
        </Button>
      </CardFooter>
    </Card>
  );
};
