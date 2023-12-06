package com.pbl6.dictionaryappbe.dto.leitner;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeitnerVocabCardGame {
    private Long vocabId;
    private Long defId;
    private String word;
    private String pos;
    private String audioUk;
    private String audioUs;
    private String phoneUk;
    private String phoneUs;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime lastLearning;
    private Integer level;
    private String question;
    private String answer;
    private Boolean result;
}
