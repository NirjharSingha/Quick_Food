package com.example.quickFood.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SignupDto {
    private String email;
    private String name;
    private String password;
}
