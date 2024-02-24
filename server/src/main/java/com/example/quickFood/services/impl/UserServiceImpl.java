package com.example.quickFood.services.impl;

import com.example.quickFood.dto.SignupDto;
import com.example.quickFood.enums.Role;
import com.example.quickFood.models.users.User;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Override
    public void addUser(SignupDto signupDto) {
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User(signupDto.getEmail(), signupDto.getName(), signupDto.getPassword(), Role.CUSTOMER, null, null, new Timestamp(System.currentTimeMillis()), null);
        userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

}
