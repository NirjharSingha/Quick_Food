package com.example.quickFood.services.impl;

import com.example.quickFood.dto.IdNameImgDto;
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
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    private final UserRepository userRepository;

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

    @Override
    public List<IdNameImgDto> searchRestaurant(String name) {
        return restaurantRepository.searchRestaurant(name);
    }

    @Override
    public String restaurantName(String resId) {
        return restaurantRepository.restaurantName(resId);
    }

    @Override
    public List<Pair<String, Double>> getRestaurantSale(String resId, String timestampString) {
        List<Pair<String, Double>> saleList = new ArrayList<>();

        for (int i = 0; i < 7; i++) {

            // Parse the ISO string to LocalDate
            LocalDateTime dateTime = LocalDateTime.parse(timestampString, DateTimeFormatter.ISO_DATE_TIME);
            dateTime = dateTime.minusDays(i - 1);
            LocalDate date = dateTime.toLocalDate();
            DayOfWeek dayOfWeek = dateTime.getDayOfWeek();

            // Get start and end timestamps for the given date
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

            // Set nanoseconds to maximum value for end of the day
            endOfDay = endOfDay.withNano(999999999);

            Timestamp startTimestamp = Timestamp.valueOf(startOfDay);
            Timestamp endTimestamp = Timestamp.valueOf(endOfDay);

            Double value = restaurantRepository.getRestaurantSale(resId, startTimestamp, endTimestamp);
            if (value ==  null) {
                value = 0.0;
            }
            saleList.add(Pair.of(dayOfWeek.toString(), value));

        }

        return saleList;
    }

    @Override
    public List<Pair<String, Double>> findTopSoldItems(String restaurantId) {
        List<Pair<String, Double>> topSoldItems = restaurantRepository.findTopSoldItems(restaurantId);
        List<Pair<String, Double>> topSoldItemsCopy = new ArrayList<>();
        double total = 0.0;

        for (Pair<String, Double> pair : topSoldItems) {
            total += pair.getSecond();
        }

        int ct = 0;
        for (Pair<String, Double> pair : topSoldItems) {
            Double percentage = pair.getSecond() / total * 100;
            topSoldItemsCopy.add(Pair.of(pair.getFirst(), percentage));
            ct++;
            if (ct == 5) {
                break;
            }
        }

        double leftPercentage = 100.0;

        for (Pair<String, Double> pair : topSoldItemsCopy) {
            leftPercentage -= pair.getSecond();
        }

        if (leftPercentage > 0) {
            topSoldItemsCopy.add(Pair.of("Others", leftPercentage));
        }

        return topSoldItemsCopy;
    }
}
