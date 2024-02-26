package com.example.quickFood.controllers;

import com.example.quickFood.models.User;
import com.example.quickFood.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String updateUser(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute User user) {
        System.out.println("Inside controller");
        try {
            if (file != null && !file.isEmpty()) {
                user.setProfilePic(file.getBytes());
            } else {
                user.setProfilePic(new byte[0]);
            }
            userService.updateUser(user);
            return "user updated successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to add user";
        }
    }
}

