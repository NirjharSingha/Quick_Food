package com.example.quickFood.controllers;

import com.example.quickFood.dto.MenuDto;
import com.example.quickFood.services.impl.MenuServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin
public class MenuController {
    @Autowired
    private MenuServiceImpl menuService;

    @PostMapping("/addMenu")
    public ResponseEntity<String> addMenu(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute MenuDto menuDto) {
        try {
            if (file != null && !file.isEmpty()) {
                menuDto.setImage(file.getBytes());
            }

            return menuService.addMenu(menuDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add menu");
        }
    }

    @PutMapping("/updateMenu")
    public ResponseEntity<String> updateMenu(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute MenuDto menuDto) {
        try {
            if (file != null && !file.isEmpty()) {
                menuDto.setImage(file.getBytes());
            }

            return menuService.updateMenu(menuDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update menu");
        }
    }

    @GetMapping("/getMenuByResId")
    public ResponseEntity<List<MenuDto>> getMenuByResId(@RequestParam String resId) {
        return menuService.getMenuByResId(resId);
    }
}
