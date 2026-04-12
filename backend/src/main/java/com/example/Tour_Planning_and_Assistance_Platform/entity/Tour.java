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

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TourDestination> tourDestinations;

    // getters & setters

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return this.duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Double getBudget() {
        return this.budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public TourType getType() {
        return this.type;
    }

    public void setType(TourType type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Booking> getBookings() {
        return this.bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<TourDestination> getTourDestinations() {
        return this.tourDestinations;
    }

    public void setTourDestinations(List<TourDestination> tourDestinations) {
        this.tourDestinations = tourDestinations;
    }
}