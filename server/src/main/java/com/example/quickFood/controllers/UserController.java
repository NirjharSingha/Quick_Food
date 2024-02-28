package com.example.quickFood.controllers;

import com.example.quickFood.dto.UpdateProfileDto;
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
    public void updateUser(@RequestParam(value = "file", required = false) MultipartFile file, @ModelAttribute UpdateProfileDto updateProfileDto) {
        try {
            if (file != null && !file.isEmpty()) {
                updateProfileDto.setProfilePic(file.getBytes());
            } else {
                updateProfileDto.setProfilePic(new byte[0]);
            }
            userService.updateUser(updateProfileDto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

