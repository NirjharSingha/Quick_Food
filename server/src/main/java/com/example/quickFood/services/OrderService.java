package com.example.quickFood.services;

import com.example.quickFood.dto.OrderCard;
import com.example.quickFood.dto.OrderDataPage;
import com.example.quickFood.dto.PlaceOrder;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    List<OrderCard> getOrderCard(String id, String flag);

    ResponseEntity<String> placeOrder(PlaceOrder placeOrder);

    ResponseEntity<OrderDataPage> getOrderDataPage(int orderId);

    ResponseEntity<String> markAsPrepared(int orderId);
}
