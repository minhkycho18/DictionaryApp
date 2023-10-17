package com.pbl6.dictionaryappbe.dto.vocabulary;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VocabularySubcategoryRequestDto {
    private Long vocabId;
    private Long defId;
}
