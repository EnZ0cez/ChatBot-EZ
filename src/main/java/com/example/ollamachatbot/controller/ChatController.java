package com.example.ollamachatbot.controller;

import com.example.ollamachatbot.model.ChatMessage;
import com.example.ollamachatbot.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/message")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage chatMessage) {
        try {
            ChatMessage response = chatService.processMessage(chatMessage.getMessage());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ChatMessage errorResponse = new ChatMessage(chatMessage.getMessage(), "Error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/simple")
    public ResponseEntity<String> sendSimpleMessage(@RequestBody String message) {
        try {
            String response = chatService.getSimpleResponse(message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Chat service is running");
    }
}