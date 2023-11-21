package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Management")
@RestController
@RequestMapping("/managements")
@RequiredArgsConstructor
public class ManagerController {
    private final VocabularyService vocabularyService;

    @Operation(summary = "Update default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @PutMapping("/vocabs/{vocabId}")
    public VocabDetailDto updateVocabInfo(@PathVariable Long vocabId,
                                          @RequestBody @Valid UpdateDefaultVocabRequest updateDefaultVocabRequest){
        return vocabularyService.updateDefaultVocab(vocabId, updateDefaultVocabRequest);
    }

    @Operation(summary = "Delete default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @DeleteMapping("/vocabs/{vocabId}")
    public ResponseEntity<String> deleteVocab(@PathVariable Long vocabId){
        vocabularyService.deleteDefaultVocab(vocabId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Delete vocab successfully");
    }
}
