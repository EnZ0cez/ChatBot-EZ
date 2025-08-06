package com.example.ollamachatbot.service;

import com.example.ollamachatbot.model.ChatMessage;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    @Autowired
    public ChatService(OllamaChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public ChatMessage processMessage(String userMessage) {
        try {
            Prompt prompt = new Prompt(userMessage);
            ChatResponse response = chatClient.call(prompt);
            
            String aiResponse = response.getResult().getOutput().getContent();
            
            return new ChatMessage(userMessage, aiResponse);
        } catch (Exception e) {
            return new ChatMessage(userMessage, "Sorry, I encountered an error processing your message: " + e.getMessage());
        }
    }

    public String getSimpleResponse(String userMessage) {
        try {
            return chatClient.call(userMessage);
        } catch (Exception e) {
            return "Sorry, I encountered an error: " + e.getMessage();
        }
    }
}