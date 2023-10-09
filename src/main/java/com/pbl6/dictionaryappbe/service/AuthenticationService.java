package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.auth.AuthenticationRequestDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationResponseDto;
import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;

public interface AuthenticationService {
    AuthenticationResponseDto register(RegisterRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);
}
