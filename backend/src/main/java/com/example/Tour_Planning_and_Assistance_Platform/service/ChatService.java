package com.example.Tour_Planning_and_Assistance_Platform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Destination;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Review;
import com.example.Tour_Planning_and_Assistance_Platform.repository.DestinationRepository;
import com.example.Tour_Planning_and_Assistance_Platform.repository.ReviewRepository;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;


@Service
public class ChatService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String FASTAPI_CHAT_URL = "http://127.0.0.1:8000/chat";

    public String getResponse(String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        
        java.util.Map<String, Object> requestBody = new java.util.HashMap<>();
        requestBody.put("question", message);
        requestBody.put("chat_history", java.util.List.of());
        
        org.springframework.http.HttpEntity<java.util.Map<String, Object>> request = new org.springframework.http.HttpEntity<>(requestBody, headers);
        
        try {
            org.springframework.http.ResponseEntity<java.util.Map> response = restTemplate.postForEntity(FASTAPI_CHAT_URL, request, java.util.Map.class);
            if (response.getBody() != null && response.getBody().containsKey("answer")) {
                return (String) response.getBody().get("answer");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I am currently unable to connect to the AI model.";
        }
        
        return "You can ask about destinations, tours, or bookings!";
    }
}