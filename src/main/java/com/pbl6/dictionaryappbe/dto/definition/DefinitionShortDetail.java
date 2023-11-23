package com.pbl6.dictionaryappbe.dto.definition;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DefinitionShortDetail {
    private Long defId;
    @NotEmpty(message = "Description can not be empty")
    private String wordDesc;
    private String examples;
}