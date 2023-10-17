package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class VocabularySubcategoryResponseDto {
    private Long vocabId;
    private Long defId;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private String definition;
    private String example;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime lastLearning;
}
