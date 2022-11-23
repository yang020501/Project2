package com.example.Backend.dto;

import java.io.Serializable;

public class CategoryRequestDto implements Serializable {
    private String display;

    public CategoryRequestDto(){ }

    public CategoryRequestDto(String display){
        this.display = display;
    }

    public String getDisplay(){ return display; }
}
