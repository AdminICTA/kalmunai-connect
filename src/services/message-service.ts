
import { apiService } from './api-service';
import { ENDPOINTS } from './api-config';
import { useAuth } from '@/auth/auth-context';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  sender_name?: string;
  receiver_name?: string;
}

interface MessagesResponse {
  success: boolean;
  data: Message[];
  timestamp?: string;
  message?: string;
}

interface MessageResponse {
  success: boolean;
  message?: string;
}

/**
 * Service for message-related API calls
 */
class MessageService {
  /**
   * Get all messages for a user
   */
  async getAllMessages(userId: string): Promise<Message[]> {
    try {
      const response = await apiService.get<MessagesResponse>(
        ENDPOINTS.MESSAGES.GET_ALL(userId)
      );
      
      if (response.success) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  }
  
  /**
   * Send a message to another user
   */
  async sendMessage(senderId: string, receiverId: string, message: string): Promise<boolean> {
    try {
      const response = await apiService.post<MessageResponse>(ENDPOINTS.MESSAGES.SEND, {
        sender_id: senderId,
        receiver_id: receiverId,
        message
      });
      
      return response.success;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }
  
  /**
   * Mark a message as read
   */
  async markAsRead(messageId: string): Promise<boolean> {
    try {
      const response = await apiService.post<MessageResponse>(ENDPOINTS.MESSAGES.MARK_READ, {
        message_id: messageId
      });
      
      return response.success;
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      return false;
    }
  }
  
  /**
   * Setup real-time message updates using polling
   */
  setupRealTimeMessages(userId: string, onNewMessages: (messages: Message[]) => void) {
    let lastTimestamp = new Date().toISOString();
    
    // Poll for new messages every 10 seconds
    const intervalId = setInterval(async () => {
      try {
        const response = await apiService.get<MessagesResponse>(
          `${ENDPOINTS.MESSAGES.GET_ALL(userId)}&last_timestamp=${encodeURIComponent(lastTimestamp)}`
        );
        
        if (response.success && response.data.length > 0) {
          onNewMessages(response.data);
          if (response.timestamp) {
            lastTimestamp = response.timestamp;
          }
        }
      } catch (error) {
        console.error('Failed to fetch new messages:', error);
      }
    }, 10000);
    
    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}

export const messageService = new MessageService();
