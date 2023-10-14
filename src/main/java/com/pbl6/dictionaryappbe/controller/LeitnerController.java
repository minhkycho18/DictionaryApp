package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.leitner.LevelLeitnerModificationRequestDto;
import com.pbl6.dictionaryappbe.dto.leitner.StatusLevelDto;
import com.pbl6.dictionaryappbe.dto.leitner.VocabLeitnerRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import com.pbl6.dictionaryappbe.service.LeitnerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Leitner")
@RestController
@RequestMapping("/leitners")
@RequiredArgsConstructor
@Validated
public class LeitnerController {
    private final LeitnerService leitnerService;

    @Operation(summary = "Add vocabulary to Leitner", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Add vocabulary to leitner successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @PostMapping
    public ResponseEntity<String> addVocabLeitner(@Valid @RequestBody VocabLeitnerRequestDto leitnerRequestDto) {
        leitnerService.addVocabToLeitner(leitnerRequestDto);
        return new ResponseEntity<>("Add vocabulary to leitner successfully", HttpStatus.CREATED);
    }

    @Operation(summary = "Show vocabularies in leitner box", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get vocabulary in leitner box success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = VocabularyLeitnerDetailDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @GetMapping("/{level}")
    public List<VocabularyLeitnerDetailDto> showVocabsLeitnerBox(
            @PathVariable("level")
            @Min(value = 0, message = "Minimum level is 0")
            @Max(value = 7, message = "Maximum level is 7")
            int level) {
        return leitnerService.showVocabsByLevel(level);
    }

    @Operation(summary = "Up/Down vocab leitner level", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Up/Down level success",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @PatchMapping("/levels/{statusLevel}")
    public ResponseEntity<String> upLevelVocabLeitner(
            @PathVariable StatusLevelDto statusLevel,
            @RequestBody LevelLeitnerModificationRequestDto leitnerRequestDtos
    ) {
        leitnerService.modifyStatusLevelVocabLetiner(leitnerRequestDtos, statusLevel);
        return new ResponseEntity<>(statusLevel.toString() + " level vocabulary successfully", HttpStatus.ACCEPTED);
    }
}
