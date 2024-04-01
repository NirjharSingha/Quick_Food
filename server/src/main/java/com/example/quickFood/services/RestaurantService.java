package com.example.quickFood.services;

import com.example.quickFood.dto.ResSearchDto;
import com.example.quickFood.dto.RestaurantDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestaurantService {
    ResponseEntity<String> addRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<String> updateRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<RestaurantDto> getRestaurantById(String id);

    ResponseEntity<List<RestaurantDto>> getRestaurantByOwner(String owner);

    List<RestaurantDto> getRestaurantsByPagination(Pageable pageable);

    List<ResSearchDto> searchRestaurant(String name);
}
