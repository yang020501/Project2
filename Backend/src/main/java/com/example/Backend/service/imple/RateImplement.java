package com.example.Backend.service.imple;

import com.example.Backend.dto.RateDto;
import com.example.Backend.dto.request.GetRateRequestDto;
import com.example.Backend.repository.RateRepo;
import com.example.Backend.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@Service
public class RateImplement implements RateService {

    @Autowired
    private RateRepo rateRepo;

    @Override
    public RateDto InsertRate(RateDto rate) {
        try{
            rateRepo.Add_Rate(rate.getUser_id(), rate.getProduct_id(), rate.getScore());
            return rate;
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public RateDto UpdateRate(RateDto rate) {
        try{
            rateRepo.Update_Rate(rate.getUser_id(), rate.getProduct_id(), rate.getScore());
            return rate;
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public RateDto GetRate(GetRateRequestDto request) {
        try{
            return rateRepo.GetRate(request.getUser_id(), request.getProduct_id());
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public List<RateDto> GetAllRateFromProduct(String product_id) {
        try{
            List<RateDto> list = rateRepo.GetAllFromProduct(product_id);
            return list;
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public List<RateDto> GetAllRateOfUser(String user_id) {
        try{
            List<RateDto> list = rateRepo.GetAllOfUser(user_id);
            return list;
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public float CalculateRateOfProduct(String product_id) {
        try{
            List<RateDto> list = rateRepo.GetAllFromProduct(product_id);
            if(list.isEmpty()){
                return 0;
            }
            else {
                float sum = 0;
                for (RateDto r : list) {
                    sum+=r.getScore();
                }
                return sum / list.size();
            }
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }

    @Override
    public RateDto Rating(RateDto rate) {
        try{
            GetRateRequestDto request = new GetRateRequestDto(rate.getUser_id(), rate.getProduct_id());
            if(GetRate(request) != null){
                UpdateRate(rate);
            }
            else {
                InsertRate(rate);
            }
            return rate;
        }
        catch (Exception e){
            throw new ResourceAccessException(e.getLocalizedMessage());
        }
    }
}
