package com.example.Tour_Planning_and_Assistance_Platform.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Tour;
import com.example.Tour_Planning_and_Assistance_Platform.entity.TourType;
import com.example.Tour_Planning_and_Assistance_Platform.service.TourService;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping
    public List<Tour> getAll(@RequestParam(required = false) TourType type) {
        return tourService.getAllTours(type);
    }

    @GetMapping("/{id}")
    public Tour getById(@PathVariable Long id) {
        return tourService.getTourById(id);
    }

    @PostMapping
    public Tour create(@RequestBody Tour tour) {
        return tourService.createTour(tour);
    }

    @PostMapping("/generate")
    public Map<String, Object> generate(@RequestBody Map<String, Object> request) {
        int duration = 0;
        if (request.containsKey("duration")) {
            duration = Integer.parseInt(request.get("duration").toString());
        }
        
        double budget = 0.0;
        if (request.containsKey("budget")) {
            budget = Double.parseDouble(request.get("budget").toString());
        }
        
        List<String> preferences = null;
        if (request.containsKey("preferences")) {
            preferences = (List<String>) request.get("preferences");
        }

        return tourService.generateTour(duration, budget, preferences);
    }
}