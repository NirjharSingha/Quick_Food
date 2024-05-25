package com.example.quickFood.dto;

import com.example.quickFood.enums.Reaction;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChatDto {
    private int id;
    private int roomId;
    private String message;
    private Long senderId;
    private Long receiverId;
    private Timestamp timeStamp;
    @JsonProperty("isEdited")
    private boolean isEdited;
    @JsonProperty("isSeen")
    private boolean isSeen;
    private Reaction reaction;
    private List<ChatFileDto> files;
}
