package com.example.quickFood.services.impl;

import com.example.quickFood.dto.*;
import com.example.quickFood.models.User;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserServiceImpl userService;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtServiceImpl jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<JwtAuthenticationResponse> userSignup(SignupDto request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .id(request.getId())
                .password(hashedPassword)
                .name(request.getName())
                .build();

        request.setPassword(hashedPassword);

        if (userRepository.findById(request.getId()).isEmpty()) {
            userService.addUser(request);
            String jwt = jwtService.generateToken(user);

            return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                    .token(jwt)
                    .build());
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(JwtAuthenticationResponse.builder()
                            .error("Duplicate id")
                            .build());
        }
    }

    @Override
    public ResponseEntity<JwtAuthenticationResponse> userLogin(LoginDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword()));
            var user = userRepository.findById(request.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid id or password."));
            var jwt = jwtService.generateToken(user);
            return ResponseEntity.ok(JwtAuthenticationResponse.builder().token(jwt).build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(JwtAuthenticationResponse.builder()
                            .error("Invalid credentials")
                            .build());
        }
    }

    @Override
    public ResponseEntity<JwtAuthenticationResponse> googleAuth(GoogleAuth request) {
        try {
            if (userRepository.findById(request.getId()).isEmpty()) {
                User user = User.builder()
                        .id(request.getId())
                        .name(request.getName())
                        .build();
                userService.addOAuthUser(request);
                var jwt = jwtService.generateToken(user);

                return ResponseEntity.ok(JwtAuthenticationResponse.builder()
                        .token(jwt)
                        .build());
            } else {
                var user = userRepository.findById(request.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
                var jwt = jwtService.generateToken(user);
                return ResponseEntity.ok(JwtAuthenticationResponse.builder().token(jwt).build());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
