package com.example.quickFood.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderCard {
    private int id;
    private String restaurantName;
    private byte[] restaurantPic;
    private double price;
    private Timestamp timestamp;
}
