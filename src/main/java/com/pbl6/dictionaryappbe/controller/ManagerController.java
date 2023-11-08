package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Management")
@RestController
@RequestMapping("/managements")
@RequiredArgsConstructor
public class ManagerController {
    private final VocabularyService vocabularyService;

    @PutMapping("/vocabs/{vocabId}")
    public VocabDetailDto updateVocabInfo(@PathVariable Long vocabId,
                                          @RequestBody @Valid UpdateDefaultVocabRequest updateDefaultVocabRequest){
        return vocabularyService.updateDefaultVocab(vocabId, updateDefaultVocabRequest);
    }
}
