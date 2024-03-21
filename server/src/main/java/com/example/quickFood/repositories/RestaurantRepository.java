package com.example.quickFood.repositories;

import com.example.quickFood.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, String> {
    Optional<Restaurant> findById(String resId);
}
