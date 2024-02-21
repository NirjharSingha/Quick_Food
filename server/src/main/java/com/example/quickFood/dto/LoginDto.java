package com.example.quickFood.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginDto {
  private String email;
  private String password;
}
