package com.example.Backend.service.imple;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.ProductDto;
import com.example.Backend.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.repository.ProductRepo;
import com.example.Backend.service.ProductService;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class ProductImplement implements ProductService {
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public List<ProductDto> getAll() {
        return productRepo.GetAll();
    }

    @Override
    public ProductDto getDetail_byID(String id) {
        return productRepo.GetDetail_byID(id);
    }

    @Override
    public List<ProductDto> getAll_byCateID(String id_cate) {
        return productRepo.GetAll_byCateID(id_cate);
    }

    @Override
    public List<ProductDto> getProduct_byCateSlug(String categorySlug) {
        return productRepo.GetProduct_byCateSlug(categorySlug);
    }

    @Override
    public List<ProductDto> getProduct_bySlug(String slug) {
        return productRepo.GetProduct_bySlug(slug);
    }

    @Override
    public List<ProductDto> getAll_SaleProduct() {
        return productRepo.GetAllSaleProduct();
    }

    @Override
    public List<ProductDto> getClothes() {
        List<ProductDto> list = productRepo.GetAll();
        List<ProductDto> clothes = new ArrayList<>();
        try{
            for(ProductDto product : list){
                if(product.getCategorySlug().contains("quan") || product.getCategorySlug().contains("ao")){
                    clothes.add(product);
                }
            }

            return clothes;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ProductDto> getAccessory() {
        List<ProductDto> list = productRepo.GetAll();
        List<ProductDto> accessory = new ArrayList<>();
        try{
            for(ProductDto product : list){
                if(!(product.getCategorySlug().contains("quan") || product.getCategorySlug().contains("ao"))){
                    accessory.add(product);
                }
            }

            return accessory;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean check_Title_duplicate(String title) {
        try{
            String checker = productRepo.Check_DuplicateTitle(title);
            if(checker != null){
                return false;
            }

            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public ProductDto add(ProductDto product) {
        try{
            String id = "";
            String id_check = "";
            do{
                id = RandomGenerate.GenerateId(5);
                id_check = productRepo.Check_Id_exist(id);
            }
            while (id.equals(id_check));
            String title = product.getTitle();
            String id_cate = product.getId_cate();
            String gender = product.getGender();
            String image1 = product.getImage1();
            String image2 = product.getImage2();
            Long price = product.getPrice();
            String slug = generate_slug(product.getTitle());
            String category_slug = generate_slug(categoryRepo.GetDisplay_byId(product.getId_cate()));
            String colors = product.getColors();
            String size = product.getSize();
            String description = product.getDescriptions();

            ProductDto dto = new ProductDto(id, title, id_cate, category_slug, gender, image1, image2, price, slug, colors
                    , size, description, 0);

            productRepo.Add_Product(id, title, id_cate, category_slug, gender, image1, image2, price, slug, colors
                    , size, description);

            return dto;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ProductDto update(ProductDto product) {
        try{
            String title = product.getTitle();
            String id_cate = product.getId_cate();
            String category_slug = generate_slug(categoryRepo.GetDisplay_byId(product.getId_cate()));
            String gender = product.getGender();
            String image1 = product.getImage1();
            String image2 = product.getImage2();
            Long price = product.getPrice();
            String slug = generate_slug(product.getTitle());
            String colors = product.getColors();
            String size = product.getSize();
            String description = product.getDescriptions();
            int sale = product.getSale();
            String id = product.getId();

            productRepo.Update_Product(title, id_cate, category_slug, gender, image1, image2, price, slug, colors
            , size, description, sale, id);

            ProductDto dto = new ProductDto(id, title, id_cate, category_slug, gender, image1, image2, price, slug, colors
                    , size, description, sale);

            return dto;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ProductDto delete(ProductDto product) {
        try{
            productRepo.Delete_Product(product.getId());
            return product;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public String removeAccent(String s) {

        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }

    public String generate_slug(String title){
        String slug = title.replace("  ", " ");
        slug = slug.trim();
        slug = removeAccent(slug);
        slug = slug.replace(" ", "-");

        return slug;
    }

}
