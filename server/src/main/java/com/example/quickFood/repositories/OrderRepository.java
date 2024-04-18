package com.example.quickFood.repositories;

import com.example.quickFood.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> findById(int id);

    @Query("SELECT o.id FROM Order o LEFT JOIN Review r ON o.id = r.order.id WHERE o.user.id = :userId AND o.deliveryCompleted IS NOT NULL AND r.id IS NULL")
    List<Integer> findOrdersToReview(@Param("userId") String userId);

    @Query("SELECT o.id FROM Order o WHERE o.restaurant.id = :restaurantId AND o.deliveryTaken IS NULL")
    List<Integer> findPendingOrderOfRestaurant(@Param("restaurantId") String restaurantId);


    @Query("SELECT o.id FROM Order o WHERE o.user.id = :userId AND o.complain IS NULL")
    List<Integer> findPendingOrderOfUser(@Param("userId") String userId);

    @Query(value = "SELECT o.id FROM orders o WHERE o.rider_id = :riderId AND o.delivery_completed IS NULL LIMIT 1", nativeQuery = true)
    Integer getDeliveryOfRider(@Param("riderId") String riderId);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.isPrepared = true WHERE o.id = :orderId")
    void markAsPrepared(@Param("orderId") int orderId);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.deliveryTaken = :timestamp WHERE o.id = :orderId")
    void deliveryTaken(@Param("orderId") int orderId, @Param("timestamp") Timestamp timestamp);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.userNotified = :timestamp WHERE o.id = :orderId")
    void userNotified(@Param("orderId") int orderId, @Param("timestamp") Timestamp timestamp);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.deliveryCompleted = :timestamp WHERE o.id = :orderId")
    void deliveryCompleted(@Param("orderId") int orderId, @Param("timestamp") Timestamp timestamp);
}
