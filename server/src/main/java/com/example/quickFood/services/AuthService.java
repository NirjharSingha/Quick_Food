package com.example.quickFood.services;

import com.example.quickFood.dto.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<JwtAuthenticationResponse> userSignup(SignupDto request);
    ResponseEntity<JwtAuthenticationResponse> userLogin(LoginDto request);
    ResponseEntity<JwtAuthenticationResponse> employeeSignup(EmployeeSignup request);
    ResponseEntity<JwtAuthenticationResponse> employeeLogin(EmployeeLogin request);
}
