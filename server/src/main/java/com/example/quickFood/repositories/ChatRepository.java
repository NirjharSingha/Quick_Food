package com.example.quickFood.repositories;

import com.example.quickFood.models.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Page<Chat> findByRoomId(Integer roomId, Pageable pageable);

    void deleteByRoomId(Integer roomId);

    @Query("SELECT COUNT(c) FROM Chat c WHERE c.room.id = :roomId AND c.isSeen = false AND c.receiver.id = :userId")
    Integer getUnseenCount(int roomId, String userId);
}
