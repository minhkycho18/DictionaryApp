package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailDto;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class VocabDetailDto {
    private Long id;
    private String word;
    private String pos;
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private List<? extends DefinitionDetailDto> definitions;
    private String contributedBy;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime contributedAt;
    private VocabularyStatus status;
}
