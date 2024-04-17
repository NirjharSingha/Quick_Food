package com.example.quickFood.services.impl;

import com.example.quickFood.dto.*;
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
import java.util.Objects;

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

    @Autowired
    NotificationServiceImpl notificationService;

    @Override
    public List<OrderCard> getOrderCard(String id, String flag) {
        List<Integer> orderIds = new ArrayList<>();
        if (Objects.equals(flag, "rating")) {
            orderIds = orderRepository.findOrdersToReview(id);
        } else if (Objects.equals(flag, "resPendingOrder")) {
            orderIds = orderRepository.findPendingOrderOfRestaurant(id);
        } else if (Objects.equals(flag, "userPendingOrder")) {
            orderIds = orderRepository.findPendingOrderOfUser(id);
        }

        List<OrderCard> orderCards = new ArrayList<>();

        for (int orderId : orderIds) {
            Order order = orderRepository.findById(orderId).get();
            OrderCard orderCard = new OrderCard(order.getId(), order.getRestaurant().getName(),
                    order.getRestaurant().getImage(), order.getPrice(), order.getPaymentMethod(), order.getOrderPlaced());
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

        String riderNotification = "You have a new delivery from " + restaurant.getName() + " to customer " + user.getName() + " at place " + placeOrder.getDeliveryAddress() + " within " + placeOrder.getDeliveryTime() + " minutes";
        notificationService.addNotification(availableRider, riderNotification);
        notificationService.sendNotificationToUser(availableRider, "You have a new delivery");

        String restaurantNotification = "You have a new order from " + user.getName() + " with items worth " + placeOrder.getPrice();
        notificationService.addNotification(savedOrder.getRestaurant().getOwner().getId(), restaurantNotification);
        notificationService.sendNotificationToUser(savedOrder.getRestaurant().getOwner().getId(), "You have a new order");

        return ResponseEntity.ok("Order placed successfully");
    }

    @Override
    public ResponseEntity<OrderDataPage> getOrderDataPage(int orderId) {
        Order order = orderRepository.findById(orderId).get();
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(orderId);
        List<OrderDetailsDto> menuItems = new ArrayList<>();
        for (OrderDetails orderDetail : orderDetails) {
            OrderDetailsDto menu = new OrderDetailsDto(orderDetail.getMenu().getId(), orderDetail.getMenu().getName(), orderDetail.getMenu().getPrice(), orderDetail.getMenu().getImage(), orderDetail.getQuantity());
            menuItems.add(menu);
        }
        OrderDataPage orderDataPage = new OrderDataPage(order.getUser().getName(), order.getRestaurant().getName(), order.getRider().getName(), menuItems, order.getPrice(), order.getDeliveryFee(), order.getDeliveryTime(), order.getDeliveryAddress(), order.isPrepared(), order.getPaymentMethod(), order.getOrderPlaced(), order.getDeliveryTaken(), order.getUserNotified(), order.getDeliveryCompleted());
        return ResponseEntity.ok(orderDataPage);
    }

    @Override
    @Transactional
    public ResponseEntity<String> markAsPrepared(int orderId) {
        orderRepository.markAsPrepared(orderId);
        return ResponseEntity.ok("Order marked as prepared");
    }

    @Override
    public ResponseEntity<RiderDelivery> getDeliveryOfRider(String riderId) {
        int orderId = orderRepository.getDeliveryOfRider(riderId);
        return ResponseEntity.ok(RiderDelivery.builder()
                .orderId(orderId)
                .build());
    }
}
