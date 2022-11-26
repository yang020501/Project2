package com.example.Backend.service.imple;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.CategoryDto;
import com.example.Backend.dto.request.CategoryRequestDto;
import com.example.Backend.repository.CategoryRepo;
import com.example.Backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryImplement implements CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public List<CategoryDto> getAll() {
        return categoryRepo.GetAll();
    }

    @Override
    public String getDisplay_byId(String id) {
        try{
            return categoryRepo.GetDisplay_byId(id);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean check_Id(String id) {
        try{
            String check = categoryRepo.Check_Id_exist(id);
            if(check != null){
                return true;
            }

            return false;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean check_Display_duplicate(String display) {
        try{
            String check = categoryRepo.Check_Display_exist(display);
            if(check != null){
                return true;
            }

            return false;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public CategoryDto add(CategoryRequestDto category) {
        try{
            String id = "";
            String id_check = "";
            do{
                id = RandomGenerate.GenerateId(5);
                id_check = categoryRepo.Check_Id_exist(id);
            }
            while (id.equals(id_check));
            String display = category.getDisplay();
            CategoryDto dto = new CategoryDto(id, display);

            categoryRepo.Add_Category(id,display);

            return dto;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CategoryDto update(CategoryRequestDto category) {
        try{
            String id = categoryRepo.GetId_byDisplay(category.getDisplay());
            String display = category.getDisplay();
            CategoryDto dto = new CategoryDto(id, display);

            categoryRepo.Update_Category(id,display);

            return dto;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String delete(CategoryRequestDto category) {
        try {
            String id = categoryRepo.GetId_byDisplay(category.getDisplay());
            categoryRepo.Delete_Category(id);

            return id;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
