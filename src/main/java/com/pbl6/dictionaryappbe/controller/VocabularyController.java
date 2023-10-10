package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySearchDto;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Vocabulary")
@RestController
@RequestMapping("/vocabs")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @Value("${dictionary-app.api.default-page-size}")
    private int defaultPageSize;

    @Operation(summary = "Get vocabs with paging (if needed)", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found vocabularies", content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Invalid data")
    })
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

    @Operation(summary = "Get info vocab", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get vocab info success", content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Invalid data")
    })
    @GetMapping("/{word}")
    public String getDetailVocab(@PathVariable String word) {

        return null;
    }
}
