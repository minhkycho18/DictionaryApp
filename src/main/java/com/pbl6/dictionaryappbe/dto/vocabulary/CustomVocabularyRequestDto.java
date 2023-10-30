package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionRequestDto;
import com.pbl6.dictionaryappbe.persistence.vocabulary.WordType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class CustomVocabularyRequestDto {
    @NotEmpty(message = "Word can not be empty")
    private String word;
    private WordType wordType;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    @Valid
    private List<DefinitionRequestDto> definition;
    private Long subcategoryId;
}
