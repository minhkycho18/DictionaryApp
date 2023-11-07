package com.pbl6.dictionaryappbe.dto.vocabulary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class VocabularySubcategoryRequestDto {
    private Long vocabId;
    private Long defId;
}
