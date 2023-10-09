package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.UserDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationRequestDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationResponseDto;
import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;
import com.pbl6.dictionaryappbe.mapper.UserMapper;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public AuthenticationResponseDto register(@Valid @RequestBody RegisterRequestDto registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/authenticate")
    public AuthenticationResponseDto authenticate(@Valid @RequestBody AuthenticationRequestDto request) {
        return authenticationService.authenticate(request);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof User user) {
                return ResponseEntity.ok(userMapper.entityToUserDTO(user));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
