import { toast } from "sonner";

interface SMSConfig {
  userId: string;
  apiKey: string;
  apiBaseUrl: string;
  senderId: string;
}

interface SendSMSParams {
  contact: string;
  message: string;
}

interface SMSResponse {
  status: string;
  message: string;
  data?: any;
}

/**
 * Service for sending SMS messages to users
 */
class SMSService {
  private config: SMSConfig;

  constructor() {
    this.config = {
      userId: "91", // Your SMSLenz user ID
      apiKey: "7962bc5f-e252-4e41-88ed-9d5b7c512f2f", // Your SMSLenz API key
      apiBaseUrl: "https://smslenz.lk/api",
      senderId: "SMSlenzDemo" // Use your approved sender ID or SMSlenzDemo for testing
    };
  }

  /**
   * Send an SMS to a phone number
   * @param params Object containing contact number and message
   * @returns Promise with the response data
   */
  async sendSMS(params: SendSMSParams): Promise<SMSResponse> {
    try {
      const { contact, message } = params;
      
      // Format phone number if needed (ensure it's in +9476XXXXXXX format)
      const formattedContact = this.formatPhoneNumber(contact);
      
      // Prepare request data
      const formData = new FormData();
      formData.append('user_id', this.config.userId);
      formData.append('api_key', this.config.apiKey);
      formData.append('sender_id', this.config.senderId);
      formData.append('contact', formattedContact);
      formData.append('message', message);

      // Send request
      const response = await fetch(`${this.config.apiBaseUrl}/send-sms`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send SMS');
      }

      toast.success("SMS sent successfully");
      return data;
    } catch (error) {
      console.error('SMS sending failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send SMS');
      throw error;
    }
  }

  /**
   * Format phone number to ensure it meets the required format (+9476XXXXXXX)
   * @param phoneNumber The phone number to format
   * @returns Formatted phone number
   */
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove any non-digit characters except the plus sign
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If the number doesn't start with +94, add it
    if (!cleaned.startsWith('+94')) {
      // If it starts with 0, replace the 0 with +94
      if (cleaned.startsWith('0')) {
        cleaned = '+94' + cleaned.substring(1);
      } else {
        // Otherwise, just prepend +94
        cleaned = '+94' + cleaned;
      }
    }
    
    return cleaned;
  }

  /**
   * Send a verification code via SMS
   * @param phoneNumber Recipient's phone number
   * @returns Promise with the sent verification code
   */
  async sendVerificationCode(phoneNumber: string): Promise<string> {
    // Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send the verification code via SMS
    await this.sendSMS({
      contact: phoneNumber,
      message: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`
    });
    
    return verificationCode;
  }

  /**
   * Send notification SMS to user
   * @param phoneNumber Recipient's phone number
   * @param notification The notification message to send
   */
  async sendNotification(phoneNumber: string, notification: string): Promise<void> {
    await this.sendSMS({
      contact: phoneNumber,
      message: notification
    });
  }
}

export const smsService = new SMSService();
