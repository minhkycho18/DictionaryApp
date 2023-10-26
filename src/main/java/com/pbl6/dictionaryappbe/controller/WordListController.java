package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.wordlist.WordListRequestDto;
import com.pbl6.dictionaryappbe.dto.wordlist.WordListResponseDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.service.WordListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/{wordListId}")
    public WordListResponseDto getWordlistById(@PathVariable long wordListId) {
        return wordListService.getWordListById(wordListId);
    }

    @Operation(summary = "Get all WordLists by user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping
    public List<WordListResponseDto> getWordlists() {
        return wordListService.getAllByUser();
    }

    @Operation(summary = "Get all system's WordLists which is created by Content Manager")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))})})
    @GetMapping("/default")
    public List<WordListResponseDto> getAllSystemWordlists() {
        return wordListService.getAllSystemWordList(RoleName.CONTENT_MANAGER);
    }

    @Operation(summary = "Get all public WordLists except system's WordLists and current user's WordLists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))})})
    @GetMapping("/public")
    public List<WordListResponseDto> getAllPublicWordLists() {
        return wordListService.getAllPublicWordList();
    }


    @GetMapping("/types")
    public ListType[] getAllWordListType() {
        return ListType.values();
    }

    @Operation(summary = "Create a new WordLists", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @PostMapping
    public WordListResponseDto createWordList(@RequestBody @Valid @NotNull WordListRequestDto wordList) {
        return wordListService.createWordList(wordList);
    }

    @Operation(summary = "Edit WordLists", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WordListResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource"),})
    @PutMapping("/{id}")
    public WordListResponseDto updateWordList(@PathVariable Long id, @RequestBody @Valid @NotNull WordListRequestDto wordList) {
        return wordListService.updateWordList(id, wordList);
    }

    @Operation(summary = "Delete WordLists", security = {@SecurityRequirement(name = "bearer-key")})
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
