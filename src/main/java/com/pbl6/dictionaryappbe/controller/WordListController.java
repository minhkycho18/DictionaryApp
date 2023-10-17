package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.service.WordListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Wordlist")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/wordlists")
public class WordListController {

    private final WordListService wordListService;

    @Operation(summary = "Get WordList by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/{wordListId}")
    public WordListDto getWordlistById(@PathVariable long wordListId) {
        return wordListService.getWordListById(wordListId);
    }

    @Operation(summary = "Get all WordLists by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping
    public List<WordListDto> getWordlists() {
        return wordListService.getAllByUser();
    }

    @Operation(summary = "Get all system's WordLists which is created by Content Manager")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))})})
    @GetMapping("/default")
    public List<WordListDto> getAllSystemWordlists() {
        return wordListService.getAllSystemWordList(RoleName.CONTENT_MANAGER);
    }

    @Operation(summary = "Get all public WordLists except system's WordLists and current user's WordLists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))})})
    @GetMapping("/public")
    public List<WordListDto> getAllPublicWordLists() {
        return wordListService.getAllPublicWordList();
    }

    @Operation(summary = "Create a new WordLists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @PostMapping
    public WordListDto createWordList(@RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.createWordList(wordList);
    }

    @Operation(summary = "Edit WordLists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource"),})
    @PutMapping("/{id}")
    public WordListDto updateWordList(@PathVariable Long id, @RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.updateWordList(id, wordList);
    }

    @Operation(summary = "Delete WordLists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource"),})
    @DeleteMapping("/{id}")
    public String deleteWordList(@PathVariable Long id) {
        wordListService.deleteWordList(id);
        return "Delete successfully";
    }
}
