package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryResponseDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.SubcategoryType;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import com.pbl6.dictionaryappbe.service.SubcategoryService;
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

@Tag(name = "Subcategory")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

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
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public List<VocabularySubcategoryResponseDto> getAllVocabulary(@PathVariable Long subcategoryId) {
        return subcategoryService.getAllVocabularies(subcategoryId);
    }

    @Operation(summary = "Get all type of subcategories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))})})
    @GetMapping("/subcategories/types")
    public SubcategoryType[] getAllSubcategoryType() {
        return SubcategoryType.values();
    }

    @Operation(summary = "Add vocabulary to subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public String addVocabularyToSubcategory(@PathVariable Long subcategoryId,
                                             @Valid @RequestBody VocabularySubcategoryRequestDto vocabSub) {
        subcategoryService.addVocabToSubcategory(subcategoryId, vocabSub);
        return "Add successfully";
    }

    @Operation(summary = "Create a new subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories")
    public SubcategoryResponseDto createSubcategory(@PathVariable Long wordListId,
                                                    @Valid @RequestBody SubcategoryRequestDto subcategory) {
        return subcategoryService.createSubcategory(wordListId, subcategory);
    }

    @Operation(summary = "Create custom vocabulary in subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}/custom")
    public VocabDefId createCustomVocabulary(@PathVariable Long wordListId,
                                             @PathVariable String subcategoryId,
                                             @Valid @RequestBody CustomVocabularyRequestDto customVocab) {
        customVocab.setSubcategoryId(Long.valueOf(subcategoryId));
        return subcategoryService.createCustomVocabulary(customVocab);
    }

    @Operation(summary = "Edit a subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PutMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public SubcategoryResponseDto updateSubcategory(@PathVariable Long subcategoryId,
                                                    @RequestBody @Valid @NotNull SubcategoryRequestDto subcategory) {
        return subcategoryService.updateSubcategory(subcategoryId, subcategory);
    }

    @Operation(summary = "Delete a subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @DeleteMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public String deleteSubcategory(@PathVariable Long subcategoryId) {
        subcategoryService.deleteSubcategory(subcategoryId);
        return "Delete successfully";
    }


}
