package com.example.Backend.dto.request;

import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.model.CartInfo;

import java.io.Serializable;
import java.util.List;

public class CartRequestDto implements Serializable {

    private String user_id;
    private List<CartInfoDto> list_product;
    private String address;
    private long total;

    public CartRequestDto(){ }

    public CartRequestDto(String user_id, List<CartInfoDto> list_product, String address, long total) {
        this.user_id = user_id;
        this.list_product = list_product;
        this.address = address;
        this.total = total;
    }

    public String getUserID() {
        return user_id;
    }
    public List<CartInfoDto> getList_product() {
        return list_product;
    }
    public String getAddress() {
        return address;
    }
    public long getTotal() {return total;}

}
