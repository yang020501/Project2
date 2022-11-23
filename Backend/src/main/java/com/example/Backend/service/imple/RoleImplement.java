package com.example.Backend.service.imple;

import com.example.Backend.repository.RoleRepo;
import com.example.Backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleImplement implements RoleService {
    @Autowired
    private RoleRepo roleRepo;

    @Override
    public String getNameFormId(String id) {
        return roleRepo.getname_byId(id);
    }

    @Override
    public String getIdFromName(String name) {
        return null;
    }
}
