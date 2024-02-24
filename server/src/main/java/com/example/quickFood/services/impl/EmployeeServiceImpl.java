package com.example.quickFood.services.impl;

import com.example.quickFood.dto.EmployeeSignup;
import com.example.quickFood.enums.Role;
import com.example.quickFood.models.employees.Employee;
import com.example.quickFood.repositories.EmployeeRepository;
import com.example.quickFood.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return employeeRepository.findById(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Employee not found"));
            }
        };
    }

    public void addEmployee(EmployeeSignup employeeSignup) {
        if (employeeRepository.findById(employeeSignup.getId()).isPresent()) {
            throw new RuntimeException("Id already exists");
        }
        Employee employee = new Employee(employeeSignup.getId(), employeeSignup.getName(), employeeSignup.getPassword(), Role.RIDER, null, null, new Timestamp(System.currentTimeMillis()), null);
        employeeRepository.save(employee);
    }
    public void updateEmployee(Employee employee) {}

}
