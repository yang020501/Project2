package com.example.Backend.dto.request;

import java.io.Serializable;

public class ProductInCartDto implements Serializable {
    private String cart_id;
    private String product_id;
    private String title;
    private String image1;
    private String image2;
    private int quantity;
    private Long price;
    private boolean active;

    public ProductInCartDto(){ }

    public ProductInCartDto(String cart_id, String product_id, String title, String image1, String image2, int quantity, Long price, boolean active) {
        this.cart_id = cart_id;
        this.product_id = product_id;
        this.title = title;
        this.image1 = image1;
        this.image2 = image2;
        this.quantity = quantity;
        this.price = price;
        this.active = active;
    }

    public String getCart_id() {
        return cart_id;
    }

    public void setCart_id(String cart_id) {
        this.cart_id = cart_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
