package com.example.Tour_Planning_and_Assistance_Platform.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

@NoArgsConstructor 
@AllArgsConstructor

@Entity
@Getter
@Setter
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double rating = 0.0;

    @Column(length = 1000)
    private String comment;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    @JsonBackReference
    private Destination destination;

    // getters & setters


    //Custom Setter to handle null ratings
    public void setRating(Double rating) {
        this.rating = (rating == null) ? 0.0 : rating;
    }
}