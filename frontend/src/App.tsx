import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { sendMessage } from './services/chatService';

interface Message {
  message: string;
  response?: string;
  timestamp: number;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message
    const userMsg: Message = {
      message: userMessage,
      timestamp: Date.now(),
      isUser: true
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      
      // Add bot response
      const botMsg: Message = {
        message: userMessage,
        response: response.response,
        timestamp: Date.now(),
        isUser: false
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMsg: Message = {
        message: userMessage,
        response: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
        isUser: false
      };

      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="chat-header">
        <h1>🤖 Ollama Chatbot</h1>
        <p>Powered by Spring AI & Ollama</p>
      </header>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>Welcome to Ollama Chatbot!</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.isUser ? msg.message : msg.response || ''}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="loading-message">
              <div className="loading-indicator">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;
