package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.persistence.Definition;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubcategoryDetailResponseDto extends VocabularySubcategoryDto {
    private Definition definition;

    @Builder
    public SubcategoryDetailResponseDto(Long vocabId, String word, String pos, String phoneUs, String phoneUk, String audioUs, String audioUk, boolean isReview, boolean isFlashcard, boolean isQuiz, Definition definition, LocalDateTime lastLearning) {
        super(vocabId, word, pos, phoneUs, phoneUk, audioUs, audioUk, isReview, isFlashcard, isQuiz, lastLearning);
        this.definition = definition;
    }
}
