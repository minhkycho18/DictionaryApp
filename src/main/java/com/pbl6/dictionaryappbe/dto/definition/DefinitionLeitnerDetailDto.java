package com.pbl6.dictionaryappbe.dto.definition;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DefinitionLeitnerDetailDto {
    private Long defId;
    private String wordDesc;
    private Integer level;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime lastLearning;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime studyTime;
}
