package com.example.quickFood.controllers;

import com.example.quickFood.dto.RestaurantDto;
import com.example.quickFood.services.impl.RestaurantServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
public class RestaurantController {
    @Autowired
    private RestaurantServiceImpl restaurantService;

    @PostMapping("/addRestaurant")
    public ResponseEntity<String> addRestaurant(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute RestaurantDto restaurantDto) {
        try {
            if (file != null && !file.isEmpty()) {
                restaurantDto.setImage(file.getBytes());
            }

            return restaurantService.addRestaurant(restaurantDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add restaurant");
        }
    }

    @PutMapping("/updateRestaurant")
    public ResponseEntity<String> updateRestaurant(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute RestaurantDto restaurantDto) {
        try {
            if (file != null && !file.isEmpty()) {
                restaurantDto.setImage(file.getBytes());
            }

            return restaurantService.updateRestaurant(restaurantDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update restaurant");
        }
    }

    @GetMapping("/getRestaurantById")
    public ResponseEntity<RestaurantDto> getRestaurantById(@RequestParam String id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/getRestaurantByOwner")
    public ResponseEntity<List<RestaurantDto>> getRestaurantByOwner(@RequestParam String owner) {
        return restaurantService.getRestaurantByOwner(owner);
    }

    @GetMapping("/getRestaurantsByPagination")
    public ResponseEntity<List<RestaurantDto>> getRestaurantsByPagination(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<RestaurantDto> restaurantPage = restaurantService.getRestaurantsByPagination(pageable);
        return ResponseEntity.ok(restaurantPage);
    }
}
