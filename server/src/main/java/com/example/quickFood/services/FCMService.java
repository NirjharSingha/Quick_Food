package com.example.quickFood.services;

public interface FCMService {
    void sendNotification(String title, String message, String token);
}
