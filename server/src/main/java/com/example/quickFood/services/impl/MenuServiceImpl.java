package com.example.quickFood.services.impl;

import com.example.quickFood.dto.MenuDto;
import com.example.quickFood.models.Menu;
import com.example.quickFood.models.Restaurant;
import com.example.quickFood.repositories.MenuRepository;
import com.example.quickFood.repositories.RestaurantRepository;
import com.example.quickFood.services.MenuService;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public ResponseEntity<MenuDto> addMenu(MenuDto menuDto) {
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(menuDto.getRestaurantId());
        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            Menu menu = Menu.builder()
                    .name(menuDto.getName())
                    .price(menuDto.getPrice())
                    .category(menuDto.getCategory())
                    .restaurant(restaurant)
                    .quantity(menuDto.getQuantity())
                    .image(menuDto.getImage())
                    .build();

            try {
                Menu savedMenu = menuRepository.save(menu);
                int id = savedMenu.getId();
                System.out.println("Menu ID: " + id);
                menuDto.setId(id);

                return ResponseEntity.ok(menuDto);
            } catch (DataIntegrityViolationException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .build();
            }
        } else {
            return ResponseEntity.badRequest().body(menuDto);
        }
    }

    @Override
    public ResponseEntity<MenuDto> updateMenu(MenuDto menuDto) {
        Optional<Menu> optionalMenu = menuRepository.findById(menuDto.getId());
        if (optionalMenu.isPresent()) {
            Menu menu = optionalMenu.get();
            menu.setId(menuDto.getId());

            Restaurant restaurant = restaurantRepository.findById(menuDto.getRestaurantId()).get();
            menu.setRestaurant(restaurant);

            menu.setName(menuDto.getName());
            menu.setPrice(menuDto.getPrice());
            menu.setCategory(menuDto.getCategory());
            menu.setQuantity(menuDto.getQuantity());
            if (menuDto.getImage() != null) {
                // Update the image only if it is not null
                menu.setImage(menuDto.getImage());
            } else {
                // Otherwise, keep the existing image
                menuDto.setImage(menu.getImage());
            }

            try {
                menuRepository.save(menu);
                return ResponseEntity.ok(menuDto);
            } catch (DataIntegrityViolationException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .build();
            }
        } else {
            return ResponseEntity.badRequest().body(menuDto);
        }
    }

    @Override
    public List<MenuDto> getMenuByResId(String resId, Pageable pageable) {
        Page<Menu> menuPage = menuRepository.findByRestaurantId(resId, pageable);
        List<MenuDto> menuDtoList = new ArrayList<>();

        for (Menu menu : menuPage) {
            System.out.println(menu.getId());
            MenuDto menuDto = new MenuDto(menu.getId(), menu.getRestaurant().getId(), menu.getName(), menu.getPrice(), menu.getCategory(), menu.getImage(), menu.getQuantity());
            menuDtoList.add(menuDto);
        }
        return menuDtoList;
    }
}
