package com.pbl6.dictionaryappbe.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CreationVocabLeitnerRequestDto {
    @NotNull(message = "vocabId should not be null")
    private Long vocabId;

    @NotNull(message = "defId should not be null")
    private Long defId;
}
