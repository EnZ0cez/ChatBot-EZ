import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/chat';

export interface ChatMessageResponse {
  message: string;
  response: string;
  timestamp: number;
}

export const sendMessage = async (message: string): Promise<ChatMessageResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/message`, {
      message: message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message to chatbot');
  }
};

export const checkHealth = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw new Error('Failed to check service health');
  }
};