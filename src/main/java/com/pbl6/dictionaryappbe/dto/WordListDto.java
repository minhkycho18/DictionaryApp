package com.pbl6.dictionaryappbe.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WordListDto {
    @NotEmpty(message = "Title can not be empty")
    private String title;
    private String listDesc;
    private String createdBy;
}
