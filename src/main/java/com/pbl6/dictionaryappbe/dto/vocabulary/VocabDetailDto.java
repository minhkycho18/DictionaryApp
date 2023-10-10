package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class VocabDetailDto {
    private Long id;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private List<? extends DefinitionDetailDto> definitions;
}
