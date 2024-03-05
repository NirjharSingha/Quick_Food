package com.example.quickFood.services;

import com.example.quickFood.dto.GoogleAuth;
import com.example.quickFood.dto.LoginDto;
import com.example.quickFood.dto.SignupDto;
import com.example.quickFood.dto.UpdateProfileDto;
import com.example.quickFood.models.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    void addUser(SignupDto user);

    ResponseEntity<String> updateUser(UpdateProfileDto updateProfileDto);

    ResponseEntity<String> updatePassword(LoginDto loginDto);

    void addOAuthUser(GoogleAuth user);

    ResponseEntity<Integer> profilePercentage(String userId);

    ResponseEntity<User> getUser(String userId);
}
