package com.pbl6.dictionaryappbe.dto.leitner;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LevelLeitnerModificationRequestDto {
    @Min(value = 0, message = "Minimum level is 0")
    @Max(value = 7, message = "Maximum level is 7")
    private int level;

    @NotEmpty(message = "List vocab must not be null")
    @JsonProperty("leitnerIds")
    private List<VocabLeitnerRequestDto> vocabLeitnerRequestDtoList;
}
