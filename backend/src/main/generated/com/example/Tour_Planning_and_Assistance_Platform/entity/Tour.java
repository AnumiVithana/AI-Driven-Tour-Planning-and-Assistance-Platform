package com.example.Tour_Planning_and_Assistance_Platform.entity;

import com.example.Tour_Planning_and_Assistance_Platform.entity.TourType;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@Table(name = "tours")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 1000)     //newly added
    private String description;

    private Integer duration;
    private Double budget;
    
    @Enumerated(EnumType.STRING)   //newly added
    private TourType type; 

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "tour")
    @JsonManagedReference
    private List<TourDestination> tourDestinations;

    // getters & setters
}