package com.example.Tour_Planning_and_Assistance_Platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Tour_Planning_and_Assistance_Platform.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}