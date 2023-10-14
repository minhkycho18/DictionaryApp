package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pbl6.dictionaryappbe.dto.definition.DefinitionLeitnerDetailDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class VocabularyLeitnerDetailDto {
    private Long vocabId;
    private String word;
    private String pos;
    @JsonProperty("definitions")
    private List<DefinitionLeitnerDetailDto> shortDetailDtos;
}
