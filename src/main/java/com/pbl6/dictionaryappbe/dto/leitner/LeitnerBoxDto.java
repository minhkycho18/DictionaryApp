package com.pbl6.dictionaryappbe.dto.leitner;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeitnerBoxDto {
    private String level;
    private String levelName;
    private Integer amountOfWord;
    private Boolean needStudy;
}
