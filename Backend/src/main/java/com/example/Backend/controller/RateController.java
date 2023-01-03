package com.example.Backend.controller;

import com.example.Backend.dto.RateDto;
import com.example.Backend.dto.UserDto;
import com.example.Backend.dto.request.UserRequestDto;
import com.example.Backend.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import javax.transaction.Transactional;

@RestController
@RequestMapping(value = "/rate")
public class RateController {

    @Autowired
    private RateService rateService;

    @Transactional
    @PostMapping("/rate-product")
    public Object sign(@RequestBody RateDto rate) {
        try {
            rateService.InsertRate(rate);
            return new ResponseEntity<RateDto>(rate, HttpStatus.CREATED);
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @CrossOrigin
    @Transactional
    @PatchMapping("/update-rate")
    public Object update(@RequestBody RateDto rate) {
        try {
            rateService.UpdateRate(rate);
            return new ResponseEntity<RateDto>(rate, HttpStatus.OK);
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }
}