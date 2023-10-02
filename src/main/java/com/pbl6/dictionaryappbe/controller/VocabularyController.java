package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.VocabularySearchDto;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vocabs")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @Value("${dictionary-app.api.default-page-size}")
    private int defaultPageSize;

    @GetMapping
    public Page<VocabularySearchDto> searchVocab(
            @RequestParam(name = "offset", defaultValue = "0")
            @Min(value = 0, message = "Offset must be greater than or equal to 0") int offset,
            @Min(value = 1, message = "Limit must be greater than or equal to 1")
            @RequestParam(name = "limit", required = false) Integer limit,
            @RequestParam(name = "keyword", defaultValue = "") String keyword
    ) {
        if (limit == null) {
            limit = defaultPageSize;
        }
        return vocabularyService.findByKeyword(keyword, offset, limit);
    }
}
