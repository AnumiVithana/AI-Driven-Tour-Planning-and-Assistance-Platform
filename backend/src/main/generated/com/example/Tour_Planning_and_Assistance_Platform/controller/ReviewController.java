package com.example.Tour_Planning_and_Assistance_Platform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Tour_Planning_and_Assistance_Platform.entity.Review;
import com.example.Tour_Planning_and_Assistance_Platform.repository.ReviewRepository;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    //Add a review
    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    //List all the reviews of a destination
    @GetMapping("/destination/{id}")
    public List<Review> getByDestination(@PathVariable Long id) {
        return reviewRepository.findByDestinationId(id);
    }
}