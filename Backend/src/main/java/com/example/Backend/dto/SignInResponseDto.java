package com.example.Backend.dto;

import java.io.Serializable;

public class SignInResponseDto implements Serializable {
    private final String message;
    private final UserDto new_user;

    public SignInResponseDto(String message, UserDto new_user) {
        this.message = message;
        this.new_user = new_user;
    }

    public String getMessage() {
        return message;
    }

    public UserDto getNew_user() {
        return new_user;
    }
}
