package com.example.quickFood.services.impl;

import com.example.quickFood.dto.NotificationDto;
import com.example.quickFood.models.Notification;
import com.example.quickFood.models.User;
import com.example.quickFood.repositories.NotificationRepository;
import com.example.quickFood.repositories.UserRepository;
import com.example.quickFood.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final FCMServiceImpl fcmService;

    @Override
    public ResponseEntity<List<NotificationDto>> getNotifications(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findByUserId(userId);
            List<NotificationDto> notificationDtoList = new ArrayList<>();
            for (Notification notification : notifications) {
                NotificationDto notificationDto = new NotificationDto(notification.getId(), notification.getDescription(), notification.getTimestamp(), notification.isSeen());
                notificationDtoList.add(notificationDto);
            }
            return ResponseEntity.ok(notificationDtoList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<String> addNotification(String userId, String message) {
        try {
            Optional<User> optionalUser = userRepository.findById(userId);

            // Check if the User exists in the database
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                Notification notification = Notification
                        .builder()
                        .description(message)
                        .isSeen(false)
                        .timestamp(new Timestamp(System.currentTimeMillis()))
                        .user(user)
                        .build();
                notificationRepository.save(notification);
                return ResponseEntity.ok("Notification added");
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    @Override
    public ResponseEntity<String> markAsSeen(String userId) {
        try {
            List<Notification> notifications = notificationRepository.findByUserId(userId);
            for (Notification notification : notifications) {
                notification.setSeen(true);
            }
            notificationRepository.saveAll(notifications);
            return ResponseEntity.ok("Notifications marked as seen successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to mark notifications as seen.");
        }
    }

    @Override
    public ResponseEntity<String> deleteByNotificationId(int notificationId) {
        try {
            notificationRepository.deleteById(notificationId);
            fcmService.sendNotification("Notification deleted successfully.", "Notification deleted", "e794nnPof8BjGG1WcyQR5s:APA91bF4TfMk5waGodno8T9bZhjj_rxNs_01og8JB8O__C-7gCAQ4mYv9OdKOFn7aQLwpU_Q78TpPTI_HBe6ABHiFK5seShqzk1qus8FeV4GTpWfxEBAqCt_RctywNwIyzbytXCZthgF");

            return ResponseEntity.ok("Notification deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete notification.");
        }
    }

    @Transactional
    @Override
    public ResponseEntity<String> deleteByUserId(String userId) {
        try {
            notificationRepository.deleteByUserId(userId);
            return ResponseEntity.ok("Notifications deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete notifications.");
        }
    }

}
