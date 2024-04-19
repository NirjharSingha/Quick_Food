package com.example.quickFood.controllers;

import com.example.quickFood.dto.OrderCard;
import com.example.quickFood.dto.OrderDataPage;
import com.example.quickFood.dto.PlaceOrder;
import com.example.quickFood.dto.RiderDelivery;
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
    ResponseEntity<List<OrderCard>> getOrderCard(@RequestParam String id, @RequestParam String flag) {
        return ResponseEntity.ok(orderService.getOrderCard(id, flag));
    }

    @GetMapping("/getOrderDataPage")
    ResponseEntity<OrderDataPage> getOrderDataPage(@RequestParam int orderId) {
        return orderService.getOrderDataPage(orderId);
    }

    @GetMapping("deliveryOfRider")
    ResponseEntity<RiderDelivery> getDeliveryOfRider(@RequestParam String riderId) {
        return orderService.getDeliveryOfRider(riderId);
    }

    @PutMapping("/markAsPrepared")
    ResponseEntity<String> markAsPrepared(@RequestParam int orderId) {
        return orderService.markAsPrepared(orderId);
    }

    @PostMapping("/placeOrder")
    ResponseEntity<String> placeOrder(@RequestBody PlaceOrder placeOrder) {
        return orderService.placeOrder(placeOrder);
    }

    @PutMapping("/updateStatus")
    ResponseEntity<String> updateStatus(@RequestParam int orderId, @RequestParam int status) {
        return orderService.updateStatus(orderId, status);
    }

    @PutMapping("/complaint")
    ResponseEntity<String> complaint(@RequestParam int orderId, @RequestParam String complain) {
        return orderService.complaint(orderId, complain);
    }
}
