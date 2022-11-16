package com.example.Backend.dto;

import com.example.Backend.model.CartInfo;

import java.io.Serializable;
import java.util.List;

public class CartRequestDto implements Serializable {

    private final String user_id;
    private final List<CartInfo> list_product;
    private final String address;
    private final long total;

    public CartRequestDto(String user_id, List<CartInfo> list_product, String address, long total) {
        this.user_id = user_id;
        this.list_product = list_product;
        this.address = address;
        this.total = total;
    }

    public String getUserID() {
        return user_id;
    }
    public List<CartInfo> getList_product() {
        return list_product;
    }
    public String getAddress() {
        return address;
    }
    public long getTotal() {return total;}

}
