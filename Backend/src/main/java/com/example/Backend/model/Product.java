package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Product")
public class Product {
    @Id
    private String id;
    private String title;
    private String id_cate;
    private String categorySlug;
    private String gender;
    private String image1;
    private String image2;
    private long price;
    private String slug;
    private String genres;
    private String actors;
    private String status;
    private int release;
    private String descriptions;
    private int sale;
    private boolean active;

    public Product(String id, String title, String id_cate, String categorySlug, String gender, String image1, int release,
                   String image2, long price, String slug, String genres, String actors, String status,String descriptions, int sale) {
        this.id = id;
        this.title = title;
        this.id_cate = id_cate;
        this.categorySlug = categorySlug;
        this.gender = gender;
        this.image1 = image1;
        this.image2 = image2;
        this.price = price;
        this.slug = slug;
        this.genres = genres;
        this.actors = actors;
        this.status = status;
        this.release = release;
        this.descriptions = descriptions;
        this.sale = sale;
        this.active = true;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }


    public Product() {
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public String getId() {
        return id;
    }

    public void setId(String  id) {
        this.id = id;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image) {
        this.image1 = image;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image) {
        this.image2 = image;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return descriptions;
    }

    public void setDescription(String description) {
        this.descriptions = description;
    }

    public String getId_cate() {
        return id_cate;
    }
    public void setId_cate(String id_cate) {
        this.id_cate = id_cate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

    public void setCategorySlug(String categorySlug) {
        this.categorySlug = categorySlug;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }

    public int getRelease() {
        return release;
    }

    public void setRelease(int release) {
        this.release = release;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
