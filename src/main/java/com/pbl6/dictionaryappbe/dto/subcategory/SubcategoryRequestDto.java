package com.pbl6.dictionaryappbe.dto.subcategory;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SubcategoryRequestDto {
    @NotEmpty(message = "Title can not be empty")
    private String title;
    @NotEmpty(message = "Type can not be empty")
    private String subcategoryType;
    private Long wordListId;
}
