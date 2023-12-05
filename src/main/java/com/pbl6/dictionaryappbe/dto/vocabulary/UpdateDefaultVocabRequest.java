package com.pbl6.dictionaryappbe.dto.vocabulary;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionShortDetail;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UpdateDefaultVocabRequest {
    private String phoneUs;
    private String phoneUk;
    private String audioUs;
    private String audioUk;
    private VocabularyStatus status;
    @Valid
    private List<DefinitionShortDetail> definitions;
}
