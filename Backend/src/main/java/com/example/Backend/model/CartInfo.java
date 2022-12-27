package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "CartInfo")
public class CartInfo {
    @Id
    private String cart_id;
    private String product_id;
    private int quantity;
    private boolean active;
    public CartInfo() {
    }

    public CartInfo(String cart_id, String product_id, int amount) {
        this.cart_id = cart_id;
        this.product_id = product_id;
        this.quantity = amount;
        this.active = true;
    }

    public CartInfo(String product_id, String slug, String color, String size, int amount, long price) {
        this.product_id = product_id;
        this.quantity = amount;
        this.active = true;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
