package com.act.com.adding_item.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;


    // Method to set createdOn before persisting the entity
    @PrePersist
    protected void onCreate() {
        this.createdOn = LocalDateTime.now();
//        this.updatedOn = LocalDateTime.now(); // Setting the updatedOn at creation time as well
    }

    // Method to update updatedOn before updating the entity
    @PreUpdate
    protected void onUpdate() {
        this.updatedOn = LocalDateTime.now();
    }

}
