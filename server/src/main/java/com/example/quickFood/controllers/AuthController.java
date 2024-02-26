package com.example.quickFood.controllers;

import com.example.quickFood.dto.*;
import com.example.quickFood.services.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    @Autowired
    private final AuthServiceImpl authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> userSignup(@RequestBody SignupDto request) {
        return authenticationService.userSignup(request);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> userLogin(@RequestBody LoginDto request) {
        return authenticationService.userLogin(request);
    }

    @PostMapping("/googleAuth")
    public ResponseEntity<JwtAuthenticationResponse> googleAuth(@RequestBody GoogleAuth request) {
        return authenticationService.googleAuth(request);
    }

}