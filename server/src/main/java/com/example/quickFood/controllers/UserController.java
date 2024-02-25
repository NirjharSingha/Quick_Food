package com.example.quickFood.controllers;

import com.example.quickFood.models.User;
import com.example.quickFood.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PutMapping("/updateProfile")
    public String updateUser(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute User user) {
        System.out.println("Inside controller");
        try {
            // Set profile picture data if file is present
            if (file != null && !file.isEmpty()) {
                user.setProfilePic(file.getBytes());
            } else {
                // Handle case where file is missing or empty
                user.setProfilePic(new byte[0]);
            }
            user.setRegDate(new Timestamp(System.currentTimeMillis()));
            userService.updateUser(user);
            return "user updated successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to add user";
        }
    }
}

