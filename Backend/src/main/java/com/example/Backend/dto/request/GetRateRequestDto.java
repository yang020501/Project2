package com.example.Backend.dto.request;

public class GetRateRequestDto {
    private String user_id;
    private String product_id;

    public GetRateRequestDto(){ }

    public GetRateRequestDto(String user_id, String product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getProduct_id() {
        return product_id;
    }
}
