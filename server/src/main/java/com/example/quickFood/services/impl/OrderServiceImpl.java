package com.example.quickFood.services.impl;

import com.example.quickFood.dto.OrderCard;
import com.example.quickFood.dto.OrderQuantity;
import com.example.quickFood.dto.PlaceOrder;
import com.example.quickFood.models.*;
import com.example.quickFood.repositories.*;
import com.example.quickFood.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RestaurantRepository restaurantRepository;

    @Autowired
    private final RiderStatusRepository riderStatusRepository;

    @Autowired
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private final MenuRepository menuRepository;

    @Autowired
    private final MenuServiceImpl menuService;

    @Override
    public List<OrderCard> getOrderCard(String userId) {
        List<Integer> orderIds = orderRepository.findOrdersToReview(userId);
        List<OrderCard> orderCards = new ArrayList<>();

        for (int orderId : orderIds) {
            Order order = orderRepository.findById(orderId).get();
            OrderCard orderCard = new OrderCard(order.getId(), order.getRestaurant().getName(),
                    order.getRestaurant().getImage(), order.getPrice(), order.getOrderPlaced());
            orderCards.add(orderCard);
        }
        return orderCards;
    }

    @Override
    @Transactional
    public ResponseEntity<String> placeOrder(PlaceOrder placeOrder) {
        if (!menuService.validateOrderQuantity(placeOrder.getOrderQuantities())) {
            return ResponseEntity.badRequest().body("Food items out of stock");
        }
        String availableRider = riderStatusRepository.findAvailableRider();
        if (availableRider == null) {
            return ResponseEntity.badRequest().body("No available rider");
        }
        User user = userRepository.findById(placeOrder.getUserId()).get();
        User rider = userRepository.findById(availableRider).get();
        Restaurant restaurant = restaurantRepository.findById(placeOrder.getRestaurantId()).get();

        Order order = Order.builder()
                .user(user)
                .price(placeOrder.getPrice())
                .restaurant(restaurant)
                .rider(rider)
                .deliveryAddress(placeOrder.getDeliveryAddress())
                .deliveryFee(placeOrder.getDeliveryFee())
                .deliveryTime(placeOrder.getDeliveryTime())
                .paymentMethod(placeOrder.getPaymentMethod())
                .orderPlaced(new Timestamp(System.currentTimeMillis()))
                .build();

        Order savedOrder = orderRepository.save(order);

        RiderStatus riderStatus = new RiderStatus(availableRider, false);
        riderStatusRepository.save(riderStatus);

        menuService.updateQuantity(placeOrder.getOrderQuantities());

        for (OrderQuantity orderQuantity : placeOrder.getOrderQuantities()) {
            OrderDetails orderDetails = OrderDetails.builder()
                    .order(savedOrder)
                    .menu(menuRepository.findById(orderQuantity.getId()).get())
                    .quantity(orderQuantity.getQuantity())
                    .build();
            orderDetailsRepository.save(orderDetails);
        }

        return ResponseEntity.ok("Order placed successfully");
    }
}
