package com.pbl6.dictionaryappbe.dto.definition;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DefinitionRequestDto {
    @NotEmpty(message = "Definition can not be empty")
    private String wordDesc;
    private String example;
}
