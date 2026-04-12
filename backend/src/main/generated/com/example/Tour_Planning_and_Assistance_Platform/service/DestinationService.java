package com.example.Tour_Planning_and_Assistance_Platform.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Destination;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Review;
import com.example.Tour_Planning_and_Assistance_Platform.repository.DestinationRepository;
import com.example.Tour_Planning_and_Assistance_Platform.repository.ReviewRepository;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    //Get all destinations
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }


    //Get Destination by ID
    public Map<String, Object> getDestinationById(Long id) {
        Destination dest = destinationRepository.findById(id).orElseThrow();

        List<Review> reviews = reviewRepository.findByDestinationId(id);

        double avgRating = reviews.stream()
            .mapToDouble(r -> r.getRating() != null ? r.getRating() : 0.0)
            .average()
            .orElse(0.0);

        Map<String, Object> response = new HashMap<>();
        response.put("id", dest.getId());
        response.put("name", dest.getName());
        response.put("category", dest.getCategory());
        response.put("description", dest.getDescription());
        response.put("averageRating", avgRating);
        response.put("reviews", reviews);

        return response;
    }

    //Add a destination
    public Destination addDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
}