package com.example.quickFood.repositories;

import com.example.quickFood.dto.ResSearchDto;
import com.example.quickFood.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, String> {
    Optional<Restaurant> findById(String resId);

    List<Restaurant> findByOwnerId(String owner);

    @Query("SELECT new com.example.quickFood.dto.ResSearchDto(r.id, r.name, r.image) FROM Restaurant r WHERE LOWER(r.name) LIKE %:name%")
    List<ResSearchDto> searchRestaurant(@Param("name") String name);
}
