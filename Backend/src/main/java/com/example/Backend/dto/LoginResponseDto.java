package com.example.Backend.dto;

import java.io.Serializable;

public class LoginResponseDto implements Serializable {
    private String jwt;
    private String id;
    private String username;
    private String password;
    private String role_name;
    private String customer_name;
    private String phone;
    private String house_address;
    private String address1;
    private String address2;
    private String address3;

    public LoginResponseDto(){ }

    public LoginResponseDto(String jwt, String id, String username, String password, String role_name,
                            String customer_name, String phone, String house_address, String address1, String address2, String address3) {
        this.jwt = jwt;
        this.id = id;
        this.username = username;
        this.password = password;
        this.role_name = role_name;
        this.customer_name = customer_name;
        this.phone = phone;
        this.house_address = house_address;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
    }
    
    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "jwt = " + jwt + ", " +
                "id = " + id + ", " +
                "username = " + username + ", " +
                "password = " + password + ", " +
                "role_name = " + role_name + ", " +
                "customer_name = " + customer_name + ", " +
                "phone = " + phone + ", " +
                "house_address = " + house_address + ", " +
                "address1 = " + address1 + ", " +
                "address2 = " + address2 + ", " +
                "address3 = " + address3 + ")";
    }

    public String getJwt() {
        return jwt;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole_name() {
        return role_name;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public String getPhone() {
        return phone;
    }

    public String getHouse_address() {
        return house_address;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getAddress3() {
        return address3;
    }
}
