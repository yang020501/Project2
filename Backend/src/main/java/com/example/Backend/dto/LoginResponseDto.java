package com.example.Backend.dto;

import java.io.Serializable;

public class LoginResponseDto implements Serializable {
    private final String jwt;
    private final String role_name;
    private final UserDto userDto;

    public LoginResponseDto(String jwt, String role_name, UserDto userDto) {
        this.jwt = jwt;
        this.role_name = role_name;
        this.userDto = userDto;
    }
}
