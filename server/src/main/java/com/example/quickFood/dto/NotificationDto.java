package com.example.quickFood.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NotificationDto {
    private int id;
    private String description;
    private Timestamp timestamp;
    private boolean isSeen;
}
