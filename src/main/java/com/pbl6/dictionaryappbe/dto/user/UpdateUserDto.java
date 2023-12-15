package com.pbl6.dictionaryappbe.dto.user;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    @Size(max = 30, message = "Name should not be over 30 characters")
    private String name;
    private String avatar;
}
