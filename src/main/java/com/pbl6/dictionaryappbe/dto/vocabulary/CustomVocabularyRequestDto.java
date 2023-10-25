package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.persistence.vocabulary.WordType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
@AllArgsConstructor
public class CustomVocabularyRequestDto {
    @NotEmpty(message = "Word can not be empty")
    private String word;
    @NotEmpty(message = "Definition can not be empty")
    private String definition;
    private WordType wordType;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private String example;
    private Long subcategoryId;

}
