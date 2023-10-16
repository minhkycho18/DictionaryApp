package com.pbl6.dictionaryappbe.dto.leitner;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VocabLeitnerDetailDto {
    private String word;
    private String pos;
    private String definition;
    private String user;
    private LocalDateTime lastLearning;
    private Integer level;
}
