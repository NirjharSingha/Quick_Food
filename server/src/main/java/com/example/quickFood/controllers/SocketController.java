package com.example.quickFood.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class SocketController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendNotification/{userId}")
    public void sendNotificationToUser(@Payload String message, @DestinationVariable String userId) {
        String destination = "/user/" + userId + "/notifications";
        simpMessagingTemplate.convertAndSend(destination, message);
    }
}
