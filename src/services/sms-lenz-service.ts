
import { apiService } from './api-service';
import { toast } from 'sonner';

// Define the SMSLenz configuration
interface SMSLenzConfig {
  userId: string;
  apiKey: string;
  senderId: string;
  baseUrl: string;
}

// Define the SMS response type
interface SMSResponse {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Service for sending SMS through SMSLenz.lk API
 */
class SMSLenzService {
  private config: SMSLenzConfig;

  constructor() {
    // Initialize with the provided credentials
    this.config = {
      userId: '91',
      apiKey: '7962bc5f-e252-4e41-88ed-9d5b7c512f2f',
      senderId: 'SMSlenzDemo', // Use SMSlenzDemo for testing
      baseUrl: 'https://smslenz.lk/api'
    };
  }

  /**
   * Send SMS to a single contact
   * @param contact Phone number in format +9476XXXXXXX
   * @param message SMS message content (max 621 chars)
   * @returns Promise with response data
   */
  async sendSMS(contact: string, message: string): Promise<SMSResponse> {
    try {
      // Validate phone number format
      if (!contact.startsWith('+94')) {
        contact = `+94${contact.replace(/^0/, '')}`;
      }

      // Validate message length
      if (message.length > 621) {
        message = message.substring(0, 618) + '...';
      }

      // Prepare SMS request data
      const smsData = {
        user_id: this.config.userId,
        api_key: this.config.apiKey,
        sender_id: this.config.senderId,
        contact: contact,
        message: message
      };

      // Send the SMS
      const response = await fetch(`${this.config.baseUrl}/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(smsData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send SMS');
      }

      // Return the success response
      return {
        success: true,
        message: 'SMS sent successfully',
        data
      };
    } catch (error) {
      console.error('SMS sending error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send SMS';
      toast.error(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  /**
   * Send notification SMS to a public user
   * @param phone Phone number
   * @param name User's name
   * @param message Notification message
   * @returns Promise with response data
   */
  async sendNotification(phone: string, name: string, message: string): Promise<SMSResponse> {
    const formattedMessage = `Dear ${name}, ${message}`;
    return this.sendSMS(phone, formattedMessage);
  }

  /**
   * Send verification code SMS
   * @param phone Phone number
   * @param code Verification code
   * @returns Promise with response data
   */
  async sendVerificationCode(phone: string, code: string): Promise<SMSResponse> {
    const message = `Your verification code is: ${code}. This code will expire in 10 minutes.`;
    return this.sendSMS(phone, message);
  }

  /**
   * Send ID card ready notification
   * @param phone Phone number
   * @param name User's name
   * @returns Promise with response data
   */
  async sendIdCardReadyNotification(phone: string, name: string): Promise<SMSResponse> {
    const message = `Dear ${name}, your Digital ID card is now ready. Please visit the Divisional Secretariat office to collect it.`;
    return this.sendSMS(phone, message);
  }
}

export const smsLenzService = new SMSLenzService();
