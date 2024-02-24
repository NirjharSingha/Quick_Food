package com.example.quickFood.controllers;

import com.example.quickFood.dto.*;
import com.example.quickFood.services.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/signup/user")
    public ResponseEntity<JwtAuthenticationResponse> userSignup(@RequestBody SignupDto request) {
        return authenticationService.userSignup(request);
    }

    @PostMapping("/login/user")
    public ResponseEntity<JwtAuthenticationResponse> userLogin(@RequestBody LoginDto request) {
        return authenticationService.userLogin(request);
    }

    @PostMapping("/signup/employee")
    public ResponseEntity<JwtAuthenticationResponse> employeeSignup(@RequestBody EmployeeSignup request) {
        return authenticationService.employeeSignup(request);
    }

    @PostMapping("/login/employee")
    public ResponseEntity<JwtAuthenticationResponse> employeeLogin(@RequestBody EmployeeLogin request) {
        System.out.println("employee login");
        return authenticationService.employeeLogin(request);
    }
}