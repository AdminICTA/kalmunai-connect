
import { ENDPOINTS } from './api-config';
import { toast } from "sonner";

/**
 * Generic API service for making requests to the backend
 */
class ApiService {
  /**
   * Make a GET request to the API
   */
  async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      
      let queryUrl = url;
      if (params) {
        const queryParams = new URLSearchParams(params);
        queryUrl = `${url}?${queryParams.toString()}`;
      }
      
      const response = await fetch(queryUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast.error(error instanceof Error ? error.message : 'Request failed');
      throw error;
    }
  }

  /**
   * Make a POST request to the API
   */
  async post<T>(url: string, data: any): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast.error(error instanceof Error ? error.message : 'Request failed');
      throw error;
    }
  }

  /**
   * Make a PUT request to the API
   */
  async put<T>(url: string, data: any): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast.error(error instanceof Error ? error.message : 'Request failed');
      throw error;
    }
  }

  /**
   * Make a PATCH request to the API
   */
  async patch<T>(url: string, data: any): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast.error(error instanceof Error ? error.message : 'Request failed');
      throw error;
    }
  }

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(url: string, data?: any): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        ...(data && { body: JSON.stringify(data) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast.error(error instanceof Error ? error.message : 'Request failed');
      throw error;
    }
  }

  /**
   * Handle real-time updates through WebSocket if available, otherwise fallback to polling
   * @param endpoint The endpoint to listen for updates
   * @param onDataReceived Callback function to handle received data
   * @param interval Polling interval in milliseconds (default: 10000ms)
   * @returns Cleanup function to stop listening
   */
  subscribeToUpdates<T>(
    endpoint: string, 
    onDataReceived: (data: T) => void, 
    interval: number = 10000
  ): () => void {
    // Try to use WebSocket if available
    if ('WebSocket' in window && endpoint.startsWith('/')) {
      try {
        // Convert HTTP endpoint to WebSocket endpoint
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsEndpoint = `${protocol}//${window.location.host}${endpoint}`;
        
        const token = localStorage.getItem('auth_token');
        const socket = new WebSocket(wsEndpoint + (token ? `?token=${token}` : ''));
        
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            onDataReceived(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };
        
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          // Fallback to polling on websocket error
          startPolling();
        };
        
        // Return cleanup function
        return () => {
          socket.close();
        };
      } catch (error) {
        console.error('Failed to initialize WebSocket, falling back to polling:', error);
        return startPolling();
      }
    } else {
      // Fallback to polling if WebSocket is not available
      return startPolling();
    }
    
    // Polling implementation
    function startPolling() {
      let isActive = true;
      
      const poll = async () => {
        if (!isActive) return;
        
        try {
          const data = await apiService.get<T>(endpoint);
          onDataReceived(data);
        } catch (error) {
          console.error(`Polling error for ${endpoint}:`, error);
        }
        
        if (isActive) {
          setTimeout(poll, interval);
        }
      };
      
      // Start polling immediately
      poll();
      
      // Return cleanup function
      return () => {
        isActive = false;
      };
    }
  }
}

export const apiService = new ApiService();
