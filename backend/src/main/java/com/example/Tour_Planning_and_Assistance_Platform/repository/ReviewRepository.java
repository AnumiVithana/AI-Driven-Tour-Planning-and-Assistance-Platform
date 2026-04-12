package com.example.Tour_Planning_and_Assistance_Platform.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByDestinationId(Long destinationId);
}