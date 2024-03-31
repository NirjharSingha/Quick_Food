package com.example.quickFood.services.impl;

import com.example.quickFood.dto.RestaurantDto;
import com.example.quickFood.models.Restaurant;
import com.example.quickFood.models.User;
import com.example.quickFood.repositories.RestaurantRepository;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<String> addRestaurant(RestaurantDto restaurantDto) {
        if (restaurantRepository.findById(restaurantDto.getId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate restaurant ID");
        } else {
            Optional<User> optionalUser = userRepository.findById(restaurantDto.getOwner());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                Restaurant restaurant = new Restaurant(restaurantDto.getId(), restaurantDto.getName(), user, restaurantDto.getAddress(), restaurantDto.getMobile(), new Timestamp(System.currentTimeMillis()), restaurantDto.getImage());
                restaurantRepository.save(restaurant);

                return ResponseEntity.ok("Restaurant added successfully");
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
    }

    @Override
    public ResponseEntity<String> updateRestaurant(RestaurantDto restaurantDto) {
        if (restaurantRepository.findById(restaurantDto.getId()).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Restaurant not found");
        } else {
            Restaurant existingRestaurant = restaurantRepository.findById(restaurantDto.getId()).get();
            if (restaurantDto.getImage() != null) {
                existingRestaurant.setImage(restaurantDto.getImage());
            }

            Optional<User> optionalUser = userRepository.findById(restaurantDto.getOwner());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Restaurant restaurant = new Restaurant(restaurantDto.getId(), restaurantDto.getName(), user, restaurantDto.getAddress(), restaurantDto.getMobile(), existingRestaurant.getRegDate(), existingRestaurant.getImage());
                restaurantRepository.save(restaurant);

                return ResponseEntity.ok("Restaurant updated successfully");
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
    }

    @Override
    public ResponseEntity<RestaurantDto> getRestaurantById(String id) {
        if (restaurantRepository.findById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            Restaurant restaurant = restaurantRepository.findById(id).get();
            RestaurantDto restaurantDto = new RestaurantDto(restaurant.getId(), restaurant.getName(), restaurant.getOwner().getId(), restaurant.getAddress(), restaurant.getMobile(), restaurant.getImage());
            return ResponseEntity.ok(restaurantDto);
        }
    }

    @Override
    public ResponseEntity<List<RestaurantDto>> getRestaurantByOwner(String owner) {
        List<Restaurant> restaurants = restaurantRepository.findByOwnerId(owner);
        List<RestaurantDto> restaurantDtoList = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            RestaurantDto restaurantDto = new RestaurantDto(restaurant.getId(), restaurant.getName(), restaurant.getOwner().getId(), restaurant.getAddress(), restaurant.getMobile(), restaurant.getImage());
            restaurantDtoList.add(restaurantDto);
        }
        return ResponseEntity.ok(restaurantDtoList);
    }

    @Override
    public List<RestaurantDto> getRestaurantsByPagination(Pageable pageable) {
        Page<Restaurant> restaurants = restaurantRepository.findAll(pageable);
        List<RestaurantDto> restaurantDtoList = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            RestaurantDto restaurantDto = new RestaurantDto(restaurant.getId(), restaurant.getName(), restaurant.getOwner().getId(), restaurant.getAddress(), restaurant.getMobile(), restaurant.getImage());
            restaurantDtoList.add(restaurantDto);
        }
        return restaurantDtoList;
    }
}
