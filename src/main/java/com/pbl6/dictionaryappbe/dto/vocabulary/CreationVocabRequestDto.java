package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionRequestDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreationVocabRequestDto {
    @NotEmpty(message = "Word must not be empty")
    private String word;
    @NotEmpty(message = "Part of speech must not be empty")
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    @NotEmpty(message = "Part of speech must not be empty")
    private List<DefinitionRequestDto> definitions;
}
