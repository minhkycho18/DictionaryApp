package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.configuration.JwtService;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationRequestDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationResponseDto;
import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.UserMapper;
import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import com.pbl6.dictionaryappbe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    public AuthenticationResponseDto register(RegisterRequestDto request) {
        Optional<User> existedUser = userRepository.findByEmail(request.getEmail());
        if (existedUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        Role role = roleRepository.findByName(RoleName.LEARNER);
        String passwordEncode = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncode)
                .gender(request.getGender())
                .createdAt(LocalDateTime.now())
                .isLock(false)
                .role(role)
                .build();
        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDto.builder()
                .user(userMapper.entityToUserDTO(savedUser))
                .accessToken(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username or password");
        }
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RecordNotFoundException("There is no user with that email!"));
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDto.builder()
                .user(userMapper.entityToUserDTO(user))
                .accessToken(jwtToken)
                .build();
    }
}
