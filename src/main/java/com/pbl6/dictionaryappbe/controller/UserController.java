package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.UserDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationRequestDto;
import com.pbl6.dictionaryappbe.dto.auth.AuthenticationResponseDto;
import com.pbl6.dictionaryappbe.dto.auth.RegisterRequestDto;
import com.pbl6.dictionaryappbe.mapper.UserMapper;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.service.AuthenticationService;
import com.pbl6.dictionaryappbe.service.UserService;
import com.pbl6.dictionaryappbe.utils.AccountStatus;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Objects;

@Tag(name = "User")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final UserMapper userMapper;

    @Operation(summary = "Create user and user role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create user Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Email already exists")
    })
    @PostMapping("/register")
    public AuthenticationResponseDto register(@Valid @RequestBody RegisterRequestDto registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @Operation(summary = "Authenticate user to get access token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid Email or password")})
    @PostMapping("/authenticate")
    public AuthenticationResponseDto authenticate(@Valid @RequestBody AuthenticationRequestDto request) {
        return authenticationService.authenticate(request);
    }

    @Operation(summary = "Get user information", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get user info Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))}),
            @ApiResponse(responseCode = "401", description = "Authentication failed")})
    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserInfo() {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        if (user != null) {
            return ResponseEntity.ok(userMapper.entityToUserDTO(user));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Operation(summary = "Get user information", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get user info Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))}),
            @ApiResponse(responseCode = "401", description = "Authentication failed")})
    @GetMapping("")
    public List<UserDto> getAllUser() throws AccessDeniedException {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (user.getRole().getName().equals(RoleName.LEARNER)) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
        return MapperUtils.toTargetList(userMapper::entityToUserDTO, userService.findAllUser());
    }

    @Operation(summary = "Create account", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create account Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))}),
            @ApiResponse(responseCode = "401", description = "Authentication failed")})
    @PostMapping
    public UserDto createAccount(@RequestBody RegisterRequestDto userRequest) throws AccessDeniedException {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (user.getRole().getName().equals(RoleName.LEARNER)) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
        return userMapper.entityToUserDTO(userService.createAccount(userRequest));
    }

    @Operation(summary = "Lock account", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lock account Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "401", description = "Authentication failed")})
    @PostMapping("/lock")
    public String lockAccount(@RequestParam(name = "id") Long id) throws AccessDeniedException {
        checkPermissionAndExecute(id, AccountStatus.LOCK);
        return "Lock successfully";
    }

    @Operation(summary = "Lock account", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lock account Success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "401", description = "Authentication failed")})
    @PostMapping("/unlock")
    public String unlockAccount(@RequestParam(name = "id") Long id) throws AccessDeniedException {
        checkPermissionAndExecute(id, AccountStatus.UNLOCK);
        return "Unlock successfully";
    }

    private void checkPermissionAndExecute(Long id, AccountStatus action) throws AccessDeniedException {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (user.getRole().getName().equals(RoleName.LEARNER)) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
        userService.updateStatusAccount(id, action);
    }


}
