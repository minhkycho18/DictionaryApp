package com.pbl6.dictionaryappbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.user.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long userId;
    @NotEmpty(message = "Email should not be empty")
    @Email
    private String email;
    @NotEmpty(message = "User name should not be empty")
    @Size(max = 30, message = "Name should not be over 30 characters")
    private String name;
    private String image;
    private Gender gender;
    private Role role;
    @JsonFormat(pattern = "dd-MM-yyyy hh:MM:ss")
    private LocalDateTime createdAt;
    private boolean isLock;
}
