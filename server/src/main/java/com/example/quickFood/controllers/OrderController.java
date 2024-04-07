package com.example.quickFood.controllers;

import com.example.quickFood.dto.OrderCard;
import com.example.quickFood.dto.PlaceOrder;
import com.example.quickFood.services.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderServiceImpl orderService;

    @GetMapping("/getOrderCard")
    ResponseEntity<List<OrderCard>> getOrderCard(@RequestParam String userId) {
        return ResponseEntity.ok(orderService.getOrderCard(userId));
    }

    @PostMapping("/placeOrder")
    ResponseEntity<String> placeOrder(@RequestBody PlaceOrder placeOrder) {
        return orderService.placeOrder(placeOrder);
    }
}
