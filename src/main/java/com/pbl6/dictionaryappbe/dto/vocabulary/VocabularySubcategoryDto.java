package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class VocabularySubcategoryDto {
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
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime lastLearning;
}
