package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vocab")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @Value("${dictionary-app.api.default-page-size}")
    private int defaultPageSize;

    @GetMapping
    public List<Vocabulary> searchVocab(
            @RequestParam(name = "offset", defaultValue = "0")
            @Min(value = 0, message = "Offset must be greater than or equal to 0") int offset,
            @Min(value = 1, message = "Limit must be greater than or equal to 1")
            @RequestParam(name = "limit", required = false) Integer limit,
            @RequestParam String keyword
    ) {
        if (limit == null) {
            limit = defaultPageSize;
        }
        return vocabularyService.findByKeyword(keyword, offset, limit);
    }
}
