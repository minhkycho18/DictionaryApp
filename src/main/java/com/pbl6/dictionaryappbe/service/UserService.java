package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.utils.AccountStatus;

import java.util.List;

public interface UserService {
    User findUserById(Long userId);

    List<User> findAllUser();

    User createAccount(RegisterRequestDto user);

    void updateStatusAccount(Long id, AccountStatus status);
}
