package com.pbl6.dictionaryappbe.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordDto {
    private String oldPassword;
    private String newPassword;
}
