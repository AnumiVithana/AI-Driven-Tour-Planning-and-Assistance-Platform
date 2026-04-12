package com.example.Tour_Planning_and_Assistance_Platform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Destination;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Review;
import com.example.Tour_Planning_and_Assistance_Platform.repository.DestinationRepository;
import com.example.Tour_Planning_and_Assistance_Platform.repository.ReviewRepository;


@Service
public class ChatService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public String getResponse(String message) {

        message = message.toLowerCase();

        List<Destination> destinations = destinationRepository.findAll();

        // Relaxing places
        if (message.contains("relax")) {
            return "You can visit Mirissa, Ella, and Bentota for a relaxing trip.";
        }

        // Nature
        if (message.contains("nature")) {
            return destinations.stream()
                    .filter(d -> d.getCategory().equalsIgnoreCase("Nature"))
                    .map(Destination::getName)
                    .limit(3)
                    .reduce("Top nature places: ", (a, b) -> a + b + ", ");
        }

        // Best rated
        if (message.contains("best") || message.contains("rating")) {

            return destinations.stream()
                    .map(d -> {
                        List<Review> reviews = reviewRepository.findByDestinationId(d.getId());

                        double avg = reviews.stream()
                                .mapToDouble(r -> r.getRating() != null ? r.getRating() : 0.0)
                                .average()
                                .orElse(0);

                        return d.getName() + " (" + avg + ")";
                    })
                    .sorted((a, b) -> b.compareTo(a))
                    .limit(3)
                    .reduce("Top rated places: ", (a, b) -> a + b + ", ");
        }

        // Booking help
        if (message.contains("book")) {
            return "To book a tour, select a tour and click the booking option.";
        }

        // Default
        return "You can ask about destinations, tours, or bookings!";
    }
}