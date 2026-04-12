package com.example.Tour_Planning_and_Assistance_Platform.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Tour;
import com.example.Tour_Planning_and_Assistance_Platform.entity.TourType;

public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByType(TourType type);
}