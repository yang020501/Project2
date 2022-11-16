package com.example.Backend.service.imple;

import com.example.Backend.dto.CartDto;
import com.example.Backend.model.CartInfo;
import com.example.Backend.repository.CartRepo;
import com.example.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CartImplement implements CartService {
    @Autowired
    private CartRepo cartRepo;

    @Override
    public List<CartDto> getAll() {
        return null;
    }

    @Override
    public void add(String cart_id, String customer_id, String address, List<CartInfo> list_product, long total) {
        try{
            LocalDate create_date = LocalDate.now();
            cartRepo.add(cart_id, customer_id, address, create_date, total);

        }
        catch (Exception e){
            System.out.println("Error in cart");
            e.printStackTrace();
        }
    }

    @Override
    public List<String> getAll_Id() {
        return cartRepo.get_list_id();
    }

    @Override
    public List<String> getId_byCustomerID(String customer_id) {
        return cartRepo.getId_byCustomerID(customer_id);
    }

    @Override
    public List<CartDto> getCart_byCustomerID(String customer_id) {
        return cartRepo.getCart_byCustomerID(customer_id);
    }
}
