package com.example.quickFood.controllers;

import com.example.quickFood.dto.JwtAuthenticationResponse;
import com.example.quickFood.dto.LoginDto;
import com.example.quickFood.dto.SignupDto;
import com.example.quickFood.services.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthServiceImpl authenticationService;

    @PostMapping("/signup")
    public JwtAuthenticationResponse signup(@RequestBody SignupDto request) {
        return authenticationService.signup(request);
    }

    @PostMapping("/login")
    public JwtAuthenticationResponse login(@RequestBody LoginDto request) {
        return authenticationService.login(request);
    }
}