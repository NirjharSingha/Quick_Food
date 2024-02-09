package com.example.quickFood.models.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    protected String email;
    protected String name;
    protected String password;
    protected String userType;
    protected String address;
    protected String mobile;
    protected Timestamp regDate;
    @Lob
    @Column(name = "profile_pic", columnDefinition = "LONGBLOB")
    protected byte[] profilePic;
}
