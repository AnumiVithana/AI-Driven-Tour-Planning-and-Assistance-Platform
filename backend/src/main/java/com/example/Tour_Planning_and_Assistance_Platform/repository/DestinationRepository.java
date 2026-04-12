package com.example.Tour_Planning_and_Assistance_Platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Destination;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}