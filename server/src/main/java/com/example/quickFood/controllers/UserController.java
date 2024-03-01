package com.example.quickFood.controllers;

import com.example.quickFood.dto.UpdateProfileDto;
import com.example.quickFood.models.User;
import com.example.quickFood.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PutMapping("/updateProfile")
    public ResponseEntity<String> updateUser(@RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute UpdateProfileDto updateProfileDto) {
        updateProfileDto.setProfilePic(null);
        try {
            if (file != null && !file.isEmpty()) {
                updateProfileDto.setProfilePic(file.getBytes());
            }
            if (updateProfileDto.getMobile().equals("")) {
                updateProfileDto.setMobile(null);
            }
            if (updateProfileDto.getAddress().equals("")) {
                updateProfileDto.setAddress(null);
            }
            return userService.updateUser(updateProfileDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update user");
        }
    }

    @GetMapping("/profilePercentage")
    public ResponseEntity<Integer> profilePercentage(@RequestParam String userId) {
        return userService.profilePercentage(userId);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam String userId) {
        return userService.getUser(userId);
    }
}
