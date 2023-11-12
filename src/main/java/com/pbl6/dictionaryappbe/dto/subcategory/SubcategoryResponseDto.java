package com.pbl6.dictionaryappbe.dto.subcategory;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SubcategoryResponseDto {
    private Long subcategoryId;
    private String title;
    private Integer amountOfWord;
    private Long wordListId;
}
