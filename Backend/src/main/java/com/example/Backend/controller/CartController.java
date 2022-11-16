package com.example.Backend.controller;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoResponeDto;
import com.example.Backend.dto.CartRequestDto;
import com.example.Backend.model.CartInfo;
import com.example.Backend.service.CartInfoService;
import com.example.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@RestController
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartInfoService cartInfoService;

    @Transactional
    @PostMapping("/buy")
    private Object saveCart(@RequestBody CartRequestDto cartRequestDto){
        try{
            String cart_new_id = "";
            do{
                boolean is_duplicate = false;
                cart_new_id = RandomGenerate.GenerateId(9);
                for (String id : cartService.getAll_Id()) {
                    if(id == cart_new_id){
                        is_duplicate = true;
                    }
                }
                if(!is_duplicate){
                    break;
                }
            }
            while (true);
            String customer_id = cartRequestDto.getUserID();
            String address = cartRequestDto.getAddress();
            List<CartInfo> list = cartRequestDto.getList_product();
            long total = cartRequestDto.getTotal();
            cartService.add(cart_new_id, customer_id, address, list, total);
            cartInfoService.add(list, cart_new_id);
            return new ResponseEntity<String>("Success", HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }

    }
    

    @GetMapping("/{customer_id}")
    private Object getAll_byCustomerID(@PathVariable String customer_id){
        try{
            List<CartDto> list_cart = cartService.getCart_byCustomerID(customer_id);
            return new ResponseEntity<List<CartInfoResponeDto>>(cartInfoService.getAll_byCartID(list_cart), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
