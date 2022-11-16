package com.example.Backend.service;

import com.example.Backend.dto.CategoryDto;
import com.example.Backend.model.Category;

import java.util.List;

public interface CategoryService {
    public List<CategoryDto> getAll();
    public String getDisplay_byId(String id);
    public boolean check_Id(String id);
    public boolean check_Display_duplicate(String display);
    public CategoryDto add(CategoryDto category);
    public CategoryDto update(CategoryDto category);
    public CategoryDto delete(CategoryDto category);
}
