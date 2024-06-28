package com.example.quickFood.services;

import com.example.quickFood.dto.ChatDto;
import com.example.quickFood.dto.ChatFileDto;
import com.example.quickFood.dto.ChatRoomInit;
import com.example.quickFood.dto.ChatUserDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ChatService {
    ResponseEntity<List<ChatDto>> getChats(int page, int size, int roomId);

    ResponseEntity<String> deleteChats(int roomId);

    ResponseEntity<ChatDto> addChat(ChatDto chatDto, List<ChatFileDto> chatFiles);

    ResponseEntity<List<ChatUserDto>> getChatUsers(String userId);

    ResponseEntity<ChatRoomInit> chatRoomInit(int roomId, String userId);
}
