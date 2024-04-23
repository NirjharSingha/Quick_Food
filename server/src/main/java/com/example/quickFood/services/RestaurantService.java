package com.example.quickFood.services;

import com.example.quickFood.dto.IdNameImgDto;
import com.example.quickFood.dto.RestaurantDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestaurantService {
    ResponseEntity<String> addRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<String> updateRestaurant(RestaurantDto restaurantDto);

    ResponseEntity<RestaurantDto> getRestaurantById(String id);

    ResponseEntity<List<RestaurantDto>> getRestaurantByOwner(String owner);

    List<RestaurantDto> getRestaurantsByPagination(Pageable pageable);

    List<IdNameImgDto> searchRestaurant(String name);

    String restaurantName(String resId);

    List<Pair<String, Double>> getRestaurantSale(String resId, String timestampString);

    List<Pair<String, Double>> findTopSoldItems(String restaurantId);
}
