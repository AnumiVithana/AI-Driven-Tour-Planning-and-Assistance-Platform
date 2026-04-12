package com.example.Tour_Planning_and_Assistance_Platform.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate bookingDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    // getters & setters

}