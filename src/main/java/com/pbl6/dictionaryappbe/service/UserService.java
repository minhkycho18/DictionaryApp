package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.user.User;

public interface UserService {
    User findUserById(Long userId);
}
