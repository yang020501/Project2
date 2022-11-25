package com.example.Backend.controller;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.*;
import com.example.Backend.model.User;
import com.example.Backend.sercurity.CustomUserDetails;
import com.example.Backend.sercurity.JwtTokenProvider;
import com.example.Backend.service.RoleService;
import com.example.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Transactional
    @PostMapping("/login")
    public Object login(@RequestBody LoginRequestDto request) {
        try {
            List<UserDto> list_user = userService.getAll();
            boolean find = userService.checkLogin(request.getUsername(), request.getPassword(), list_user);

            if(find){
                UserDto login_user = userService.find_byUserName(request.getUsername());
                login_user.setPassword(null);

                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
                String role = roleService.getNameFormId(login_user.getId_role());

                LoginResponseDto response = new LoginResponseDto(jwt, role, login_user);

                return new ResponseEntity<LoginResponseDto>(response, HttpStatus.ACCEPTED);
            }
          
            return new ResponseEntity<String>("Login false", HttpStatus.FOUND);

        } catch (Exception e) {
            return new ResponseEntity<String>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/sign_in")

    public Object sign(@RequestBody SignInRequestDto new_user) {
        try {
            List<UserDto> list_user = userService.getAll();
            boolean find = userService.find_duplicate_username(new_user.getUsername(), list_user);
            if (find) {
                return new ResponseEntity<String>("Can not sign in with this username", HttpStatus.BAD_REQUEST);
            }
            String id = RandomGenerate.GenerateId(5);
            String username = new_user.getUsername();
            String password = new_user.getPassword();
            String id_role = roleService.getIdFromName(new_user.getRole());
            String customer_name = new_user.getCustomer_name();
            String phone = new_user.getPhone();
            String house_address = new_user.getHouse_address();
            String address1 = new_user.getAddress1();
            String address2 = new_user.getAddress2();
            String address3 = new_user.getAddress3();
            UserDto user = userService.add(id, username, password, id_role, customer_name, phone, house_address, address1, address2, address3);

            if(user == null){
                return new ResponseEntity<String>("Failed to create this user", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<SignInResponseDto>(new SignInResponseDto("Add a new user successfully", user), HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAll")
    public Object getAll() {
        try {
            List<UserDto> userlist = userService.getAll();
            return new ResponseEntity<List<UserDto>>(userlist, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @Transactional
    @PatchMapping("/update")
    public Object update(@RequestBody UserDto userDto) {
        try {
            String id = userDto.getId();
            UserDto u = userService.find_byID(id);
            System.out.println(userDto);
            String customer_name = userDto.getCustomer_name();
            if(userDto.getUsername() == null){
                customer_name = u.getCustomer_name();
            }

            String phone = userDto.getPhone();
            if(userDto.getPhone() == null){
                phone = u.getPhone();
            }

            String house_address = userDto.getHouse_address();
            if(userDto.getHouse_address() == null){
                house_address = u.getHouse_address();
            }

            String address1 = userDto.getAddress1();
            if(userDto.getAddress1() == null){
                address1 = u.getAddress1();
            }
            String address2 = userDto.getAddress2();
            if(userDto.getAddress2() == null){
                address2 = u.getAddress1();
            }

            String address3 = userDto.getAddress3();
            if(userDto.getAddress3() == null){
                address3 = u.getAddress1();
            }

            UserDto refresh_user = userService.update_information(customer_name, phone, house_address, address1, address2, address3, id);

            if(refresh_user == null){
                return new ResponseEntity<String>("Failed to update user information", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<UserDto>(refresh_user, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
