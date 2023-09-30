package com.pbl6.dictionaryappbe.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class VocabularySearchDto {
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneticsUk;
    private String audioUs;
    private String audioUk;
    private List<DefinitionResponseDto> definitionResponseDto;
}
