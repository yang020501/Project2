package com.example.Backend.repository;

import com.example.Backend.dto.CategoryDto;
import com.example.Backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    @Query("SELECT new com.example.Backend.dto.CategoryDto(p.id, p.display) FROM Category p WHERE p.active = 1")
    public List<CategoryDto> GetAll();

    @Query(value = "SELECT display FROM Category WHERE id = ?1 AND active = 1")
    public String GetDisplay_byId(String id);

    @Query(value = "SELECT id FROM Category WHERE id = ?1 AND active = 1")
    public String Check_Id_exist(String id);

    @Query(value = "SELECT id FROM Category WHERE display = ?1 AND active = 1")
    public String Check_Display_exist(String display);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO Category(id, display) " +
            "VALUES (?1, ?2)", nativeQuery = true)
    public void Add_Category(String id, String display);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Category SET display = ?2" +
            "WHERE id = ?1", nativeQuery = true)
    public void Update_Category(String id, String display);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Category SET active = 0" +
            "WHERE id = ?1", nativeQuery = true)
    public void Delete_Category(String id);

}
