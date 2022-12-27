package com.example.Backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Rate")
public class Rate {
    @Id
    private String user_id;
    private String product_id;
    private float score;

    public Rate(){ }


    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public Rate(String user_id, String product_id, float score) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.score = score;
    }


}
