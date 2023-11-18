package com.pbl6.dictionaryappbe.dto.subcategory.game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyQuestionDto {
    private Long vocabId;
    private Long defId;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private Boolean isReview;
    private Boolean isFlashcard;
    private Boolean isSpelling;
    private Boolean isQuiz;
}
