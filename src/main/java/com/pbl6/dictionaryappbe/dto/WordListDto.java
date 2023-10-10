package com.pbl6.dictionaryappbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class WordListDto {
    @NotEmpty(message = "Title can not be empty")
    private String title;
    private String listDesc;
    private String createdBy;
    private String listType;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createdAt;
}
