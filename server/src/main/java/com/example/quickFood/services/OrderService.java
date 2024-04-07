package com.example.quickFood.services;

import com.example.quickFood.dto.OrderCard;
import com.example.quickFood.dto.PlaceOrder;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    List<OrderCard> getOrderCard(String userId);
    ResponseEntity<String> placeOrder(PlaceOrder placeOrder);
}
