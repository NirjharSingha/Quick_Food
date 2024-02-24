package com.example.quickFood.configs;

import com.example.quickFood.enums.Role;
import com.example.quickFood.models.employees.Employee;
import com.example.quickFood.repositories.EmployeeRepository;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.UserService;
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

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {

      if (employeeRepository.count() == 0) {

        Employee admin = Employee
                      .builder()
                      .name("admin")
                      .id("ADMIN")
                      .password(passwordEncoder.encode("pass"))
                      .role(Role.ADMIN)
                      .regDate(new Timestamp(System.currentTimeMillis()))
                      .build();

        employeeRepository.save(admin);
        log.debug("created ADMIN user - {}", admin);
      }
    }

}
