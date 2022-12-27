package com.example.Backend.repository;

import com.example.Backend.dto.ProductDto;
import com.example.Backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.active = 1")
    List<ProductDto> GetAll();

    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.active = 1 AND p.id = ?1")
    ProductDto GetDetail_byID(String id);

    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.active = 1 AND p.id_cate = ?1")
    List<ProductDto> GetAll_byCateID(String id_cate);

    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.categorySlug = ?1 AND p.active = 1")
    List<ProductDto> GetProduct_byCateSlug(String categorySlug);

    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.slug = ?1 AND p.active = 1")
    List<ProductDto> GetProduct_bySlug(String slug);

    @Query("SELECT new com.example.Backend.dto.ProductDto(p.id, p.title, p.id_cate, p.categorySlug ,p.gender ,p.image1, p.image2, p.price, p.slug, p.genres, " +
            "p.actors, p.status, p.release, p.descriptions, p.sale) FROM Product p WHERE p.sale > 0 AND p.active = 1")
    List<ProductDto> GetAllSaleProduct();

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO Product(id, title, id_cate ,categorySlug, gender, image1, image2, price, slug, genres, actors, status, release, descriptions) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)", nativeQuery = true)
    public void Add_Product(String id, String title, String id_cate, String categorySlug, String gender, String image1, String image2,
                            long price, String slug, String genres, String actors, String status, int release, String descriptions);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Product SET active = 0 WHERE id = ?1", nativeQuery = true)
    public void Delete_Product(String id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Product SET title = ?1, id_cate = ?2, categorySlug = ?3, gender = ?4, image1 = ?5, image2 = ?6, " +
            "price = ?7, slug = ?8, genres = ?9, actors = ?10, status = ?11, release = ?12, descriptions = ?13, sale = ?14 WHERE id = ?15", nativeQuery = true)
    public void Update_Product(String title, String id_cate, String category_slug, String gender, String image1, String image2
                                , long price, String slug, String genres, String actors, String status, int release, String descriptions, int sale, String id);

    @Query(value = "SELECT id FROM Product WHERE id = ?1 AND active = 1", nativeQuery = true)
    public String Check_Id_exist(String id);

    @Query(value = "SELECT id FROM Product WHERE title = ?1 AND active = 1", nativeQuery = true)
    public String GetId_fromTitle(String title);


}
