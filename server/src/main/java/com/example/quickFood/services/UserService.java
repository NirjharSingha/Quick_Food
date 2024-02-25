package com.example.quickFood.services;

import com.example.quickFood.dto.SignupDto;
import com.example.quickFood.models.User;

public interface UserService {
    void addUser(SignupDto user);
    void updateUser(User user);
}
