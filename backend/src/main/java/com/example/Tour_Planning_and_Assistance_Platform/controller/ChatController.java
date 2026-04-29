package com.example.Tour_Planning_and_Assistance_Platform.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Tour_Planning_and_Assistance_Platform.dto.ChatRequestDTO;
import com.example.Tour_Planning_and_Assistance_Platform.service.ChatService;


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public Map<String, String> chat(@RequestBody ChatRequestDTO request) {

        String response = chatService.getResponse(request.getMessage());

        return Map.of("response", response);
    }
}