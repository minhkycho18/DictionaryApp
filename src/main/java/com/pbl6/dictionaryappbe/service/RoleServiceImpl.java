package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
