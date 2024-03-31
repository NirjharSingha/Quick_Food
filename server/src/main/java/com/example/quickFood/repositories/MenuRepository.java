package com.example.quickFood.repositories;

import com.example.quickFood.models.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findByRestaurantId(String restaurantId);

    Page<Menu> findByRestaurantId(String restaurantId, Pageable pageable);
}
