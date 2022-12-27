package com.example.Backend.repository;

import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.model.CartInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CartInfoRepo extends JpaRepository<CartInfo, Integer> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO CartInfo (cart_id, product_id, quantity) VALUES (?1, ?2, ?3)", nativeQuery = true)
    public void add(String cart_id, String product_id, int quantity);

    @Query("SELECT new com.example.Backend.model.CartInfo(p.cart_id, p.product_id, p.quantity) FROM CartInfo p" +
            " WHERE p.cart_id = ?1 AND p.active = 1")
    public List<CartInfo> getAll_byCartID(String cart_id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE CartInfo SET active = 0 WHERE cart_id = ?1 AND product_id = ?2", nativeQuery = true)
    public void delete(String cart_id, String product_id);
}
