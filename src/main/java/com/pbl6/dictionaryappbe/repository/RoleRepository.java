package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}