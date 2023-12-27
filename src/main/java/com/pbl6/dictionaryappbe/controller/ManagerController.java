package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.contribution_history.HistoryResponse;
import com.pbl6.dictionaryappbe.dto.vocabulary.CreationVocabRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.service.ContributionHistoryService;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Management")
@RestController
@RequestMapping("/managements")
@RequiredArgsConstructor
public class ManagerController {
    private final VocabularyService vocabularyService;
    private final ContributionHistoryService historyService;

    @Operation(summary = "Update default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping("/history")
    public List<HistoryResponse> getAllHistory() {
        return historyService.getAllHistory();
    }

    @Operation(summary = "Update default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @PutMapping("/vocabs/{vocabId}")
    public ResponseEntity<String> updateVocabInfo(@PathVariable Long vocabId,
                                                  @RequestBody @Valid UpdateDefaultVocabRequest updateDefaultVocabRequest) {
        vocabularyService.updateDefaultVocab(vocabId, updateDefaultVocabRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Update vocab successfully");
    }

    @Operation(summary = "Create default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @PostMapping("/vocabs")
    public ResponseEntity<String> createDefaultVocab(@Valid @RequestBody CreationVocabRequestDto vocabRequestDto) {
        vocabularyService.createDefaultVocab(vocabRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Create vocab successfully");
    }

    @Operation(summary = "Review contribution vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @PutMapping("/vocabs/{vocabId}/review")
    public ResponseEntity<String> reviewContributionVocab(@PathVariable Long vocabId,
                                                          @RequestBody @Valid UpdateDefaultVocabRequest updateDefaultVocabRequest) {
        historyService.reviewContributionVocab(vocabId, updateDefaultVocabRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Update vocab successfully");
    }

    @Operation(summary = "Delete default vocabulary", security = {@SecurityRequirement(name = "bearer-key")})
    @DeleteMapping("/vocabs/{vocabId}")
    public ResponseEntity<String> deleteVocab(@PathVariable Long vocabId) {
        vocabularyService.deleteDefaultVocab(vocabId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Delete vocab successfully");
    }


}
