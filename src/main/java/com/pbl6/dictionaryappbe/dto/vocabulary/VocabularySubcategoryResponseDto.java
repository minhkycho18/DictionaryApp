package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pbl6.dictionaryappbe.persistence.Definition;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class VocabularySubcategoryResponseDto {
    private Long vocabId;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private boolean isReview;
    private boolean isFlashcard;
    private boolean isQuiz;
    private Definition definition;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime lastLearning;
}
