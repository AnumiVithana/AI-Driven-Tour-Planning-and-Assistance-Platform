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
    public Map<String, Object> generateTour(Map<String, Object> requestParams) {

        String FASTAPI_URL = "http://127.0.0.1:8000/recommend";
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        
        // Map to FastAPI requirements
        Map<String, Object> fastApiRequest = new java.util.HashMap<>();
        
        int duration = 3;
        if (requestParams.containsKey("days")) {
            duration = Integer.parseInt(requestParams.get("days").toString());
        } else if (requestParams.containsKey("duration")) {
            duration = Integer.parseInt(requestParams.get("duration").toString());
        }
        fastApiRequest.put("days", duration > 0 ? duration : 3);
        
        int people = 2;
        if (requestParams.containsKey("people")) {
            people = Integer.parseInt(requestParams.get("people").toString());
        }
        fastApiRequest.put("people", people > 0 ? people : 2);
        
        String budgetLevel = "medium";
        if (requestParams.containsKey("budget")) {
            String b = requestParams.get("budget").toString();
            if (b.equalsIgnoreCase("Budget")) budgetLevel = "low";
            else if (b.equalsIgnoreCase("Luxury")) budgetLevel = "high";
            else budgetLevel = "medium";
        }
        fastApiRequest.put("budget_level", budgetLevel);
        
        String travelPace = "balanced";
        if (requestParams.containsKey("pace")) {
            travelPace = requestParams.get("pace").toString().toLowerCase();
        } else if (requestParams.containsKey("travel_pace")) {
            travelPace = requestParams.get("travel_pace").toString().toLowerCase();
        }
        fastApiRequest.put("travel_pace", travelPace);
        
        List<String> preferences = List.of();
        if (requestParams.containsKey("preferences")) {
            preferences = (List<String>) requestParams.get("preferences");
        }
        fastApiRequest.put("preferences", preferences);
        
        List<String> mustVisit = List.of();
        if (requestParams.containsKey("mustVisit")) {
            mustVisit = (List<String>) requestParams.get("mustVisit");
        } else if (requestParams.containsKey("must_visit_places")) {
            mustVisit = (List<String>) requestParams.get("must_visit_places");
        }
        fastApiRequest.put("must_visit_places", mustVisit);
        
        org.springframework.http.HttpEntity<Map<String, Object>> request = new org.springframework.http.HttpEntity<>(fastApiRequest, headers);
        
        try {
            org.springframework.http.ResponseEntity<Map> response = restTemplate.postForEntity(FASTAPI_URL, request, Map.class);
            if (response.getBody() != null) {
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
                
                // Keep the input variables to echo back to frontend if needed for calculation
                result.put("days", duration);
                result.put("people", people);
                result.put("budget_level", budgetLevel);
                
                return result;
            }
        } catch (Exception e) {
            System.err.println("Error calling FastAPI: " + e.getMessage());
            e.printStackTrace();
            return Map.of("error", "Unable to generate tour from AI model");
        }
        
        return Map.of("error", "No response from AI model");
    }

    @Autowired
    private com.example.Tour_Planning_and_Assistance_Platform.repository.BookingRepository bookingRepository;

    public com.example.Tour_Planning_and_Assistance_Platform.entity.Booking bookGeneratedTour(Map<String, Object> requestParams) {
        Tour tour = new Tour();
        tour.setType(TourType.GENERATED);
        tour.setTitle("Custom Generated Tour");
        
        if (requestParams.containsKey("summary")) {
            String summary = requestParams.get("summary").toString();
            if (summary.length() > 999) {
                summary = summary.substring(0, 995) + "...";
            }
            tour.setDescription(summary);
        }
        
        if (requestParams.containsKey("days")) {
            tour.setDuration(Integer.parseInt(requestParams.get("days").toString()));
        }
        
        if (requestParams.containsKey("totalPrice")) {
            tour.setBudget(Double.parseDouble(requestParams.get("totalPrice").toString()));
        }

        List<com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination> tourDestinations = new java.util.ArrayList<>();
        
        if (requestParams.containsKey("itinerary")) {
            List<Map<String, Object>> itinerary = (List<Map<String, Object>>) requestParams.get("itinerary");
            for (Map<String, Object> dayPlan : itinerary) {
                int day = 1;
                if (dayPlan.containsKey("day")) {
                    day = Integer.parseInt(dayPlan.get("day").toString());
                }
                
                if (dayPlan.containsKey("places")) {
                    List<String> places = (List<String>) dayPlan.get("places");
                    for (String placeName : places) {
                        Destination dest = destinationRepository.findByName(placeName);
                        if (dest == null) {
                            dest = new Destination();
                            dest.setName(placeName);
                            dest.setCategory("Generated");
                            dest = destinationRepository.save(dest);
                        }
                        com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination td = new com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination();
                        td.setDayNumber(day);
                        td.setDestination(dest);
                        td.setTour(tour);
                        tourDestinations.add(td);
                    }
                }
            }
        }
        
        tour.setTourDestinations(tourDestinations);
        tour = tourRepository.save(tour);
        
        com.example.Tour_Planning_and_Assistance_Platform.entity.Booking booking = new com.example.Tour_Planning_and_Assistance_Platform.entity.Booking();
        booking.setTour(tour);
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }
}