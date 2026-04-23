package com.example.Tour_Planning_and_Assistance_Platform.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Destination;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Tour;
import com.example.Tour_Planning_and_Assistance_Platform.entity.TourType;
import com.example.Tour_Planning_and_Assistance_Platform.repository.DestinationRepository;
import com.example.Tour_Planning_and_Assistance_Platform.repository.TourRepository;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    //Get all Predefined tours
    public List<Tour> getAllTours(TourType type) {
        if (type != null) {
            return tourRepository.findByType(type);
        }
        return tourRepository.findAll();
    }

    //Get a tour by ID
    public Tour getTourById(Long id) {
        return tourRepository.findById(id).orElseThrow();
    }

    //Create a tour
    public Tour createTour(Tour tour) {
        tour.setType(TourType.PREDEFINED);
        if (tour.getTourDestinations() != null) {
            for (com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination td : tour.getTourDestinations()) {
                td.setTour(tour);
            }
        }
        return tourRepository.save(tour);
    }

    // CORE LOGIC - Customized Tour Generator
    public Map<String, Object> generateTour(int duration, double budget, List<String> preferences) {

        String FASTAPI_URL = "http://127.0.0.1:8000/recommend";
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        
        // Map to FastAPI requirements
        Map<String, Object> fastApiRequest = new java.util.HashMap<>();
        fastApiRequest.put("days", duration > 0 ? duration : 3);
        fastApiRequest.put("people", 2); // Default
        
        String budgetLevel = "medium";
        if (budget > 0) {
            if (budget < 500) budgetLevel = "low";
            else if (budget > 1500) budgetLevel = "high";
        }
        fastApiRequest.put("budget_level", budgetLevel);
        fastApiRequest.put("travel_pace", "balanced"); // Default
        fastApiRequest.put("preferences", preferences != null ? preferences : List.of());
        fastApiRequest.put("must_visit_places", List.of());
        
        org.springframework.http.HttpEntity<Map<String, Object>> request = new org.springframework.http.HttpEntity<>(fastApiRequest, headers);
        
        try {
            org.springframework.http.ResponseEntity<Map> response = restTemplate.postForEntity(FASTAPI_URL, request, Map.class);
            if (response.getBody() != null) {
                // Ensure we do not bring 'source' or 'sources' into SpringBoot response
                Map<String, Object> result = new java.util.HashMap<>();
                if (response.getBody().containsKey("summary")) {
                    result.put("summary", response.getBody().get("summary"));
                }
                if (response.getBody().containsKey("selected_places")) {
                    result.put("selected_places", response.getBody().get("selected_places"));
                }
                if (response.getBody().containsKey("itinerary")) {
                    result.put("itinerary", response.getBody().get("itinerary"));
                }
                
                return result;
            }
        } catch (Exception e) {
            System.err.println("Error calling FastAPI: " + e.getMessage());
            e.printStackTrace();
            return Map.of("error", "Unable to generate tour from AI model");
        }
        
        return Map.of("error", "No response from AI model");
    }
}