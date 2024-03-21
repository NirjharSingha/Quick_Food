package com.example.quickFood.services;

import com.example.quickFood.dto.RestaurantDto;
import org.springframework.http.ResponseEntity;

public interface RestaurantService {
    ResponseEntity<String> addRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<String> updateRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<RestaurantDto> getRestaurantById(String id);
}
