package com.example.Backend.dto.request;

import com.example.Backend.dto.ProductDto;

import java.io.Serializable;
import java.util.List;

public class ProductResponseDto implements Serializable {
    private List<ProductDto> list_product;
    private float rate;

    public ProductResponseDto(){}

    public ProductResponseDto(List<ProductDto> list_product, float rate) {
        this.list_product = list_product;
        this.rate = rate;
    }

    public List<ProductDto> getList_product() {
        return list_product;
    }

    public void setList_product(List<ProductDto> list_product) {
        this.list_product = list_product;
    }

    public float getRate(){
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }
}
