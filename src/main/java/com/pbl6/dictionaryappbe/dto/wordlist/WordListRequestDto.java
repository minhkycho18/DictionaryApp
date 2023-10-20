package com.pbl6.dictionaryappbe.dto.wordlist;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WordListRequestDto {
    @NotEmpty(message = "Title can not be empty")
    private String title;
    private String listDesc;
    @NotEmpty(message = "Type of wordlist can not be empty")
    private String listType;
}
