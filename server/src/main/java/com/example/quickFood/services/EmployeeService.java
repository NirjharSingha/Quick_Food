package com.example.quickFood.services;

import com.example.quickFood.dto.EmployeeSignup;
import com.example.quickFood.models.employees.Employee;

public interface EmployeeService {
    void addEmployee(EmployeeSignup employeeSignup);
    void updateEmployee(Employee employee);
}
