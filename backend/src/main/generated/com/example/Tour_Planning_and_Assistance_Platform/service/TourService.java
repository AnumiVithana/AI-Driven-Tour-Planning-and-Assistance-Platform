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
        return tourRepository.save(tour);
    }

    // CORE LOGIC - Customized Tour Generator
    public Map<String, Object> generateTour(int duration) {

        List<Destination> destinations = destinationRepository.findAll();
        List<Map<String, Object>> plan = new ArrayList<>();

        for (int i = 0; i < duration; i++) {
            Destination d = destinations.get(i % destinations.size());

            Map<String, Object> day = new HashMap<>();
            day.put("day", i + 1);
            day.put("destination", d.getName());

            plan.add(day);
        }

        Tour tour = new Tour();
        tour.setTitle("Generated Tour");
        tour.setDuration(duration);
        tour.setType(TourType.GENERATED);

        Tour saved = tourRepository.save(tour);

        return Map.of(
                "tourId", saved.getId(),
                "plan", plan
        );
    }
}