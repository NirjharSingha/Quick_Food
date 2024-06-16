package com.example.quickFood.controllers;

import com.example.quickFood.dto.ChatDto;
import com.example.quickFood.dto.ChatRoomInit;
import com.example.quickFood.dto.ChatUserDto;
import com.example.quickFood.services.impl.ChatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {
    @Autowired
    private ChatServiceImpl chatService;
    @GetMapping("/getChats")
    public ResponseEntity<List<ChatDto>> getChats(@RequestParam int page, @RequestParam int size, @RequestParam int roomId) {
        return chatService.getChats(page, size, roomId);
    }

    @GetMapping("/getChatUsers")
    public ResponseEntity<List<ChatUserDto>> getChatUsers(@RequestParam String userId) {
        return chatService.getChatUsers(userId);
    }

    @DeleteMapping("/deleteChats")
    public ResponseEntity<String> deleteChats(@RequestParam int roomId) {
        return chatService.deleteChats(roomId);
    }

    @PostMapping("/addChat")
    public ResponseEntity<ChatDto> addChat(@RequestParam(value = "files", required = false) MultipartFile[] files,
                                           @ModelAttribute ChatDto chatDto) {
        try {
            List<byte[]> chatFiles = new ArrayList<>();
            if (files != null && files.length > 0) {
                for (MultipartFile file : files) {
                    if (!file.isEmpty()) {
                        chatFiles.add(file.getBytes());
                    }
                }
            }
            return chatService.addChat(chatDto, chatFiles);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/chatRoomInit")
    public ResponseEntity<ChatRoomInit> chatUsersData(@RequestParam int roomId, @RequestParam String userId) {
        return chatService.chatUsersData(roomId, userId);
    }
}
