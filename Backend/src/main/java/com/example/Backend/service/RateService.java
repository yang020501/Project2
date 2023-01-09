package com.example.Backend.service;

import com.example.Backend.dto.RateDto;
import com.example.Backend.dto.request.GetRateRequestDto;

import java.util.List;

public interface RateService {
    public RateDto InsertRate(RateDto rate);
    public RateDto UpdateRate(RateDto rate);
    public RateDto GetRate(GetRateRequestDto request);
    public int GetRatings(String userid);
    public List<RateDto> GetAllRateFromProduct(String product_id);
    public List<RateDto> GetAllRateOfUser(String user_id);
    public float CalculateRateOfProduct(String product_id);
    public RateDto Rating(RateDto rate);
}
