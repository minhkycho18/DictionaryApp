package com.pbl6.dictionaryappbe.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pbl6.dictionaryappbe.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseDto {
    @JsonProperty("access_token")
    private String accessToken;
    private UserDto user;
}
