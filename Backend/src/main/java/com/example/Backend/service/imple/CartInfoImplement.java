package com.example.Backend.service.imple;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.dto.CartInfoResponeDto;
import com.example.Backend.model.CartInfo;
import com.example.Backend.repository.CartInfoRepo;
import com.example.Backend.service.CartInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartInfoImplement implements CartInfoService {
    @Autowired
    private CartInfoRepo cartInfoRepo;

    @Override
    public List<CartInfoResponeDto> getAll_byCartID(List<CartDto> list_cart) {
        try {
            List<CartInfoResponeDto> list_product_buy_by_customer = new ArrayList<>();
            for (CartDto cart : list_cart) {
                CartInfoResponeDto cartInfoResponeDto = new CartInfoResponeDto();

                cartInfoResponeDto.setCart_id(cart.getId());
                cartInfoResponeDto.setList_product(cartInfoRepo.getAll_byCartID(cart.getId()));
                cartInfoResponeDto.setCreate_date(cart.getCreate_date());
                cartInfoResponeDto.setTotal(cart.getTotal());
                cartInfoResponeDto.setStatus(cart.getStatus());
                cartInfoResponeDto.setAddress(cart.getAddress());

                list_product_buy_by_customer.add(cartInfoResponeDto);
            }
            return list_product_buy_by_customer;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<CartInfoDto> delete_list_cartInfo(List<CartInfoDto> delete_list) {
        return null;
    }

    @Override
    public List<CartInfoDto> modify_list_cartInfo(List<CartInfoDto> modify_list) {
        return null;
    }

    @Override
    public CartInfoDto delete_cartInfo(CartInfoDto cartInfo) {
        return null;
    }

    @Override
    public CartInfoDto modify_cartInfo(CartInfoDto cartInfo) {
        return null;
    }

    @Override
    public void add(List<CartInfo> list, String cart_id) {
        try{
            for (CartInfo product : list) {
                String product_id = product.getProduct_id();
                String slug = product.getSlug();
                String color = product.getColor();
                String size = product.getSize();
                int quantity = product.getQuantity();
                long price= product.getPrice();
                cartInfoRepo.add(cart_id, product_id, slug, color, size, quantity, price);
            }
        }
        catch (Exception e){
            System.out.println("Error in cartinfo");
            e.printStackTrace();
        }
    }

}
