package com.example.quickFood.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResSearchDto {
    private String id;
    private String name;
    private byte[] image;
}
