package com.pbl6.dictionaryappbe.dto.definition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DefinitionDetailDto {
    private Long defId;
    private String wordDesc;
    private String examples;
    private List<String> synonyms;
}
