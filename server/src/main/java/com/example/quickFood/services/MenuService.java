package com.example.quickFood.services;

import com.example.quickFood.dto.MenuDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MenuService {
    ResponseEntity<MenuDto> addMenu(MenuDto menuDto);

    ResponseEntity<MenuDto> updateMenu(MenuDto menuDto);

    List<MenuDto> getMenuByResId(String resId, Pageable pageable);
}
