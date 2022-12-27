package com.example.Backend.service;

import com.example.Backend.dto.RateDto;

import java.util.List;

public interface RateService {
    public RateDto InsertRate(RateDto rate);
    public RateDto UpdateRate(RateDto rate);
    public List<RateDto> GetAllRateFromProduct(String product_id);
    public List<RateDto> GetAllRateOfUser(String user_id);
    public float CalculateRateOfProduct(String product_id);
}
