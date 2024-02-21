package com.example.quickFood.services;

import com.example.quickFood.dto.JwtAuthenticationResponse;
import com.example.quickFood.dto.LoginDto;
import com.example.quickFood.dto.SignupDto;

public interface AuthService {
    JwtAuthenticationResponse signup(SignupDto request);
    JwtAuthenticationResponse login(LoginDto request);

}
