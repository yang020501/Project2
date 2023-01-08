package com.example.Backend.repository;

import com.example.Backend.dto.ProductDto;
import com.example.Backend.dto.RateDto;
import com.example.Backend.model.Rate;
import com.example.Backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RateRepo extends JpaRepository<Rate, Integer> {
    @Query("SELECT new com.example.Backend.dto.RateDto(p.user_id, p.product_id, p.score) FROM Rate p WHERE p.product_id = ?1")
    List<RateDto> GetAllFromProduct(String product_id);

    @Query("SELECT new com.example.Backend.dto.RateDto(p.user_id, p.product_id, p.score) FROM Rate p WHERE p.user_id = ?1")
    List<RateDto> GetAllOfUser(String user_id);

    @Query("SELECT new com.example.Backend.dto.RateDto(p.user_id, p.product_id, p.score) FROM Rate p WHERE p.user_id = ?1 AND p.product_id = ?2")
    RateDto GetRate(String user_id, String product_id);

    @Query("SELECT count(*) FROM Rate p WHERE p.user_id = ?1 AND p.product_id = ?2")
    int GetRateCount(String user_id, String product_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO Rate(user_id, product_id, score)" +
            "VALUES (?1, ?2, ?3)", nativeQuery = true)
    public void Add_Rate(String user_id, String product_id, float score);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Rate SET score = ?3 WHERE user_id = ?1 AND product_id = ?2", nativeQuery = true)
    public void Update_Rate(String user_id, String product_id, float score);
}
