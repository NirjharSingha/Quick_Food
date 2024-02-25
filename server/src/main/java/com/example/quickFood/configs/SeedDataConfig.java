package com.example.quickFood.configs;

import com.example.quickFood.enums.Role;
import com.example.quickFood.models.User;
import com.example.quickFood.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

      if (userRepository.count() == 0) {

        User admin = User
                      .builder()
                      .name("admin")
                      .id("ADMIN")
                      .password(passwordEncoder.encode("pass"))
                      .role(Role.ADMIN)
                      .regDate(new Timestamp(System.currentTimeMillis()))
                      .build();

        userRepository.save(admin);
        log.debug("created ADMIN user - {}", admin);
      }
    }

}
