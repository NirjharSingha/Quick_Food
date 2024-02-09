package com.example.quickFood.service.impl;

import com.example.quickFood.models.users.User;
import com.example.quickFood.repository.UserRepository;
import com.example.quickFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public void addUser(User user) {
        userRepository.save(user);
    }
}
