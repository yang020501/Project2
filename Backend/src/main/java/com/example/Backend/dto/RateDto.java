package com.example.Backend.dto;

import lombok.Data;

import java.io.Serializable;

public class RateDto implements Serializable {
    private final String user_id;
    private final String product_id;
    private final float score;

    public RateDto(String user_id, String product_id, float score) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.score = score;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public float getScore() {
        return score;
    }
}
