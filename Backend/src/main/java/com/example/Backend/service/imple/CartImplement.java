package com.example.Backend.service.imple;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.dto.ProductDto;
import com.example.Backend.dto.request.CartResponseDto;
import com.example.Backend.dto.request.ProductInCartDto;
import com.example.Backend.model.CartInfo;
import com.example.Backend.repository.CartInfoRepo;
import com.example.Backend.repository.CartRepo;
import com.example.Backend.repository.ProductRepo;
import com.example.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartImplement implements CartService {
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartInfoRepo cartInfoRepo;

    @Override
    public List<CartResponseDto> getAll() {
        List<CartResponseDto> response_list = new ArrayList<>();

        try{
            List<CartDto> list_cart = cartRepo.getAllCart();
            if(list_cart.isEmpty()){
                return null;
            }

            for (CartDto cart : list_cart) {
                List<CartInfo> list_product_id_cart = cartInfoRepo.getAll_byCartID(cart.getId());
                List<ProductInCartDto> list_product = new ArrayList<>();
                CartResponseDto c;
                if(list_product_id_cart.isEmpty()){

                    c = new CartResponseDto(cart.getId(), cart.getCustomer_id(), null,
                            cart.getAddress(), cart.getCreate_date(), cart.getTotal(), cart.getStatus());

                }
                else {
                    for (CartInfo i : list_product_id_cart) {
                        ProductDto dto = productRepo.GetDetail_byID(i.getProduct_id());
                        ProductInCartDto product = new ProductInCartDto(cart.getId(), dto.getId(), dto.getTitle(), dto.getImage1(),
                                dto.getImage2(), i.getQuantity(), dto.getPrice(), dto.isActive());
                        list_product.add(product);
                    }
                    c = new CartResponseDto(cart.getId(), cart.getCustomer_id(), list_product,
                            cart.getAddress(), cart.getCreate_date(), cart.getTotal(), cart.getStatus());

                }
                response_list.add(c);
            }

            return response_list;

        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void add(String cart_id, String customer_id, String address, List<CartInfoDto> list_product, long total) {
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
        try{
            return cartRepo.getCart_byCustomerID(customer_id);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CartDto updateCart_Status(CartDto cartDto) {
        try{
            cartRepo.update_Status(cartDto.getStatus(), cartDto.getId());
            return cartDto;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
