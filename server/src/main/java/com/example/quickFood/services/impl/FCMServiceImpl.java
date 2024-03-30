package com.example.quickFood.services.impl;

import com.example.quickFood.services.FCMService;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FCMServiceImpl implements FCMService {
    private final FirebaseMessaging firebaseMessaging;
    @Override
    public void sendNotification(String title, String message, String token) {
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(message)
                .build();

        // Send the notification
        Message fcmMessage = Message.builder()
                .setNotification(notification)
                .setToken(token)
                .build();

        // Send the message
        try {
            firebaseMessaging.send(fcmMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
