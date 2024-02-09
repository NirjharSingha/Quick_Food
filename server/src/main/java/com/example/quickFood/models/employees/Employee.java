package com.example.quickFood.models.employees;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    protected String employeeId;
    protected String name;
    protected String password;
    protected String employeeType;
    protected String address;
    protected String mobile;
    protected Timestamp regDate;
    protected byte[] profilePic;
}

