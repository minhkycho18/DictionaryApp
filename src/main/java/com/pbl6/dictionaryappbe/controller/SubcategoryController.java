package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.subcategory.game.GameType;
import com.pbl6.dictionaryappbe.dto.subcategory.game.VocabularyQuestionDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.service.SubcategoryGameService;
import com.pbl6.dictionaryappbe.service.SubcategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Subcategory")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;
    private final SubcategoryMapper subcategoryMapper;
    private final SubcategoryGameService subcategoryGameService;

    @Operation(summary = "Get all subcategories of WordList by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/wordlists/{wordListId}/subcategories")
    public List<SubcategoryResponseDto> getAllSubcategories(@PathVariable Long wordListId) {
        return subcategoryService.getAllSubcategories(wordListId);
    }

    @Operation(summary = "Get all vocabulary of subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryDetailResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public List<SubcategoryDetailResponseDto> getAllVocabulary(@PathVariable Long wordListId, @PathVariable Long subcategoryId) {
        return subcategoryService.getAllVocabularies(wordListId, subcategoryId);
    }

    @Operation(summary = "Add vocabulary to subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryDetailResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public SubcategoryDetailResponseDto addVocabularyToSubcategory(@PathVariable Long subcategoryId,
                                                                   @Valid @RequestBody VocabularySubcategoryRequestDto vocabSub,
                                                                   @PathVariable Long wordListId) {
        return subcategoryService.addVocabToSubcategory(wordListId, subcategoryId, vocabSub);
    }

    @Operation(summary = "Create a new subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories")
    public SubcategoryResponseDto createSubcategory(@PathVariable Long wordListId,
                                                    @NotEmpty @RequestBody String title) {
        return subcategoryService.createSubcategory(wordListId, title);
    }

    @Operation(summary = "Create custom vocabulary in subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ContributionResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}/custom")
    public ContributionResponseDto createCustomVocabulary(@PathVariable Long wordListId,
                                                          @PathVariable String subcategoryId,
                                                          @Valid @RequestBody ContributionRequestDto customVocab) {
        customVocab.setSubcategoryId(Long.valueOf(subcategoryId));
        return subcategoryService.contributeVocabulary(wordListId, customVocab);
    }

    @Operation(summary = "Clone subcategory to personal subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clone successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{sourceSubcategoryId}/clone/{targetSubcategoryId}")
    public SubcategoryResponseDto cloneSubcategory(@PathVariable Long sourceSubcategoryId,
                                                   @PathVariable Long targetSubcategoryId) {
        return subcategoryMapper.toSubcategoryResponseDto(subcategoryService.cloneSubcategory(sourceSubcategoryId, targetSubcategoryId));

    }

    @Operation(summary = "Delete vocabularies in subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @DeleteMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public String deleteVocabulariesOfSubcategory(@PathVariable Long wordListId,
                                                  @RequestBody List<VocabularySubcategoryRequestDto> vocabularies,
                                                  @PathVariable Long subcategoryId) {
        subcategoryService.deleteVocabulariesOfSubcategory(wordListId, subcategoryId, subcategoryService.getSubcategoryDetails(subcategoryId, vocabularies));
        return "Delete successfully";
    }

    @Operation(summary = "Delete a subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @DeleteMapping("/wordlists/{wordListId}/subcategories")
    public String deleteSubcategory(@RequestBody List<Long> subcategoryIds, @PathVariable Long wordListId) {
        subcategoryService.deleteSubcategories(wordListId, subcategoryIds);
        return "Delete successfully";
    }

    @GetMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}/{gameType}")
    @Operation(summary = "Get game from subcategories", security = {@SecurityRequirement(name = "bearer-key")})
    public List<? extends VocabularyQuestionDto> createGame(@PathVariable GameType gameType,
                                                      @PathVariable Long subcategoryId,
                                                      @PathVariable Long wordListId
    ) {
        List<SubcategoryDetail> subcategoryDetails =
                subcategoryGameService.getRandomSubDetailByGameType(gameType, subcategoryId, wordListId);
        return switch (gameType){
            case FLASHCARD -> subcategoryGameService.createFlashcardGame(subcategoryDetails);
            case QUIZ -> subcategoryGameService.createQuizGame(subcategoryDetails);
            default -> subcategoryGameService.createReviewSpellingGame(subcategoryDetails);
        };
    }
}
