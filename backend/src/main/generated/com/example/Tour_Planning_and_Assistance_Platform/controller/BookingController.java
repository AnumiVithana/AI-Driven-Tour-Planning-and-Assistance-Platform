package com.example.Tour_Planning_and_Assistance_Platform.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Booking;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Tour;
import com.example.Tour_Planning_and_Assistance_Platform.repository.BookingRepository;
import com.example.Tour_Planning_and_Assistance_Platform.repository.TourRepository;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository;

    @PostMapping
    public Booking bookTour(@RequestBody Map<String, Long> request) {
        Long tourId = request.get("tourId");

        Tour tour = tourRepository.findById(tourId).orElseThrow();

        Booking booking = new Booking();
        booking.setTour(tour);
        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }
}