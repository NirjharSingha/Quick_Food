package com.example.quickFood.services.impl;

import com.example.quickFood.dto.ChatDto;
import com.example.quickFood.dto.ChatFileDto;
import com.example.quickFood.dto.ChatUserDto;
import com.example.quickFood.models.Chat;
import com.example.quickFood.models.ChatFile;
import com.example.quickFood.models.Order;
import com.example.quickFood.models.User;
import com.example.quickFood.repositories.ChatFileRepository;
import com.example.quickFood.repositories.ChatRepository;
import com.example.quickFood.repositories.OrderRepository;
import com.example.quickFood.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    @Autowired
    private final ChatRepository chatRepository;
    @Autowired
    private final ChatFileRepository chatFileRepository;
    @Autowired
    private final OrderRepository orderRepository;

    @Override
    public ResponseEntity<List<ChatDto>> getChats(int page, int size, int roomId) {
        Order order = orderRepository.findById(roomId).get();
        if (order.getDeliveryCompleted() != null || order.getCancelled() != null) {
            return ResponseEntity.notFound().build();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Chat> chatPage = chatRepository.findByRoomId(roomId, pageable);

        if (chatPage.hasContent()) {
            List<Chat> chatList = chatPage.getContent();
            List<ChatDto> chatDtoList = new ArrayList<>();

            for (Chat chat : chatList) {
                List<ChatFile> chatFileList = chatFileRepository.findByChatId(chat.getId());
                List<ChatFileDto> chatFileDtoList = new ArrayList<>();
                for (ChatFile chatFile : chatFileList) {
                    ChatFileDto chatFileDto = ChatFileDto.builder()
                            .id(chatFile.getId())
                            .data(chatFile.getData())
                            .build();
                    chatFileDtoList.add(chatFileDto);
                }

                ChatDto chatDto = ChatDto.builder()
                        .id(chat.getId())
                        .roomId(chat.getRoom().getId())
                        .senderId(chat.getSender().getId())
                        .receiverId(chat.getReceiver().getId())
                        .message(chat.getMessage())
                        .timestamp(chat.getTimestamp())
                        .isEdited(chat.isEdited())
                        .isSeen(chat.isSeen())
                        .reaction(chat.getReaction())
                        .files(chatFileDtoList)
                        .build();

                chatDtoList.add(chatDto);
            }

            return ResponseEntity.ok(chatDtoList);
        }

        return ResponseEntity.ok(new ArrayList<>());
    }

    @Override
    @Transactional
    public ResponseEntity<String> deleteChats(int roomId) {
        chatFileRepository.deleteChatFiles(roomId);
        chatRepository.deleteByRoomId(roomId);
        return ResponseEntity.ok("Chats deleted successfully");
    }

    @Override
    public ResponseEntity<ChatDto> addChat(ChatDto chatDto, List<byte[]> chatFiles) {
        Order order = orderRepository.findById(chatDto.getRoomId()).get();
        User customer = order.getUser();
        User rider = order.getRider();

        User sender;
        User receiver;

        if (Objects.equals(customer.getId(), chatDto.getSenderId())) {
            sender = customer;
            receiver = rider;
        } else {
            sender = rider;
            receiver = customer;
        }

        Chat chat = Chat.builder()
                .room(order)
                .sender(sender)
                .receiver(receiver)
                .message(chatDto.getMessage())
                .isSeen(false)
                .timestamp(new Timestamp(System.currentTimeMillis()))
                .isEdited(false)
                .reaction(chatDto.getReaction())
                .build();

        Chat savedChat = chatRepository.save(chat);
        List<ChatFileDto> savedFiles = new ArrayList<>();

        for (byte[] chatFile : chatFiles) {
            ChatFile savedFile = chatFileRepository.save(ChatFile.builder()
                    .chat(savedChat)
                    .data(chatFile)
                    .build());

            savedFiles.add(new ChatFileDto(savedFile.getId(), savedFile.getData()));
        }

        ChatDto chatDto1 = ChatDto.builder()
                .id(savedChat.getId())
                .roomId(savedChat.getRoom().getId())
                .senderId(savedChat.getSender().getId())
                .receiverId(savedChat.getReceiver().getId())
                .message(savedChat.getMessage())
                .timestamp(savedChat.getTimestamp())
                .isEdited(savedChat.isEdited())
                .isSeen(savedChat.isSeen())
                .reaction(savedChat.getReaction())
                .files(savedFiles)
                .build();

        return ResponseEntity.ok(chatDto1);
    }

    @Override
    public ResponseEntity<List<ChatUserDto>> getChatUsers(String userId) {
        List<ChatUserDto> chatUserDtoList = orderRepository.getChatUsers(userId);
        for (ChatUserDto chatUserDto : chatUserDtoList) {
            chatUserDto.setUnseenCount(chatRepository.getUnseenCount(chatUserDto.getRoomId(), userId));
        }

        return ResponseEntity.ok(chatUserDtoList);
    }
}
