package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.auth.AuthenticationResponseDto;
import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Role")
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @Operation(summary = "Get all roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get roles success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))}),
    })
    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}
