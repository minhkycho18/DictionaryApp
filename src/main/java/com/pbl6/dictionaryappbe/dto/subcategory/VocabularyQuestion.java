package com.pbl6.dictionaryappbe.dto.subcategory;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VocabularyQuestion<T> {
    private Long vocabId;
    private Long defId;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private String question;
    private T result;
    // review -> T = null
    // flashcard -> T = boolean
    // spelling -> T = string
    // quiz -> T = Map<String,Boolean>
}
