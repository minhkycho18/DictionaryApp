package com.pbl6.dictionaryappbe.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SubcategoryDto {

    private Long subcategoryId;
    @NotEmpty(message = "Title can not be empty")
    private String title;
    private Integer amountOfWord;
    @NotEmpty(message = "Type can not be empty")
    private String subcategoryType;
    private Long wordListId;
}
