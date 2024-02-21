package com.example.quickFood.services;

import com.example.quickFood.dto.JwtAuthenticationResponse;
import com.example.quickFood.dto.LoginDto;
import com.example.quickFood.dto.SignupDto;
import com.example.quickFood.models.users.User;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserServiceImpl userService;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signup(SignupDto request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();

        userService.addUser(request);

        String jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .build();
    }


    public JwtAuthenticationResponse login(LoginDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

}
