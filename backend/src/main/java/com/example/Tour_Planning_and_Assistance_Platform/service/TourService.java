package com.example.Tour_Planning_and_Assistance_Platform.service;

import java.util.ArrayList;
import java.util.HashMap;
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

        List<Destination> allDestinations = destinationRepository.findAll();
        List<Destination> destinations = new ArrayList<>();
        
        if (preferences != null && !preferences.isEmpty()) {
            for (Destination d : allDestinations) {
                if (preferences.contains(d.getCategory())) {
                    destinations.add(d);
                }
            }
        }
        
        // fallback in case no destinations match the preferences
        if (destinations.isEmpty()) {
            destinations = allDestinations;
        }

        List<Map<String, Object>> plan = new ArrayList<>();
        List<com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination> tourDestinations = new ArrayList<>();

        Tour tour = new Tour();
        long count = tourRepository.countByType(TourType.GENERATED);
        tour.setTitle("Customized tour " + (count + 1));
        tour.setDuration(duration);
        tour.setBudget(budget);
        tour.setType(TourType.GENERATED);

        for (int i = 0; i < duration; i++) {
            Destination d = destinations.get(i % destinations.size());

            Map<String, Object> day = new HashMap<>();
            day.put("day", i + 1);
            day.put("destination", d.getName());

            plan.add(day);

            com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination td = new com.example.Tour_Planning_and_Assistance_Platform.entity.TourDestination();
            td.setDestination(d);
            td.setDayNumber(i + 1);
            td.setTour(tour);
            tourDestinations.add(td);
        }

        tour.setTourDestinations(tourDestinations);
        Tour saved = tourRepository.save(tour);

        return Map.of(
                "tourId", saved.getId(),
                "plan", plan
        );
    }
}