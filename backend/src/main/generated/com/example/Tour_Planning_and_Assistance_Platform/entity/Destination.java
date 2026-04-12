package com.example.Tour_Planning_and_Assistance_Platform.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    @Column(length = 1000)
    private String description;

    private String category;
    private Double rating = 0.0;

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "destination")
    private List<TourDestination> tourDestinations;

    // Constructors
    public Destination() {}

    public Destination(String name, String location, String description, String category, Double rating) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.category = category;
        this.rating = rating;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public void setRating(Double rating) {
    this.rating = (rating == null) ? 0.0 : rating;
}
}