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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLearning;
    private Integer level;
    private String question;
    private String answer;
    private Boolean result;
}
