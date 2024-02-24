package com.example.quickFood.repositories;

import com.example.quickFood.models.employees.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findById(String id);
}
