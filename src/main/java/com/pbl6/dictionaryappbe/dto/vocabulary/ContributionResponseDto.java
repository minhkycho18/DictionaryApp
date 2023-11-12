package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.persistence.Definition;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
public class ContributionResponseDto extends VocabularySubcategoryDto {
    private List<Definition> definitions;

    @Builder
    public ContributionResponseDto(Long vocabId, String word, String pos, String phoneUs, String phoneUk, String audioUs, String audioUk, boolean isReview, boolean isFlashcard, boolean isQuiz, List<Definition> definitions, LocalDateTime lastLearning) {
        super(vocabId, word, pos, phoneUs, phoneUk, audioUs, audioUk, isReview, isFlashcard, isQuiz, lastLearning);
        this.definitions = definitions;
    }
}
