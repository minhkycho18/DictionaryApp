package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.subcategory.SubcategoryType;
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
    private final SubcategoryMapper subcategoryMapper;

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
    public List<SubcategoryDetailResponseDto> getAllVocabulary(@PathVariable Long subcategoryId, @PathVariable String wordListId) {
        return subcategoryService.getAllVocabularies(subcategoryId);
    }

    @Operation(summary = "Get all type of subcategories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryType.class))})})
    @GetMapping("/subcategories/types")
    public SubcategoryType[] getAllSubcategoryType() {
        return SubcategoryType.values();
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
                                                    @Valid @RequestBody SubcategoryRequestDto subcategory) {
        return subcategoryService.createSubcategory(wordListId, subcategory);
    }

    @Operation(summary = "Create custom vocabulary in subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = CustomVocabularyResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}/custom")
    public CustomVocabularyResponseDto createCustomVocabulary(@PathVariable Long wordListId,
                                                              @PathVariable String subcategoryId,
                                                              @Valid @RequestBody CustomVocabularyRequestDto customVocab) {
        customVocab.setSubcategoryId(Long.valueOf(subcategoryId));
        return subcategoryService.createCustomVocabulary(wordListId, customVocab);
    }

    @Operation(summary = "Clone subcategory to personal subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clone successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping("/wordlists/{wordListId}/subcategories/{oldSubcategoryId}/clone/{newSubcategoryId}")
    public SubcategoryResponseDto cloneSubcategory(@PathVariable Long wordListId,
                                                   @PathVariable Long oldSubcategoryId,
                                                   @PathVariable Long newSubcategoryId) {
        return subcategoryMapper.toSubcategoryResponseDto(subcategoryService.cloneSubcategory(oldSubcategoryId, newSubcategoryId));

    }

    @Operation(summary = "Edit a subcategory", security = {@SecurityRequirement(name = "bearer-key")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PutMapping("/wordlists/{wordListId}/subcategories/{subcategoryId}")
    public SubcategoryResponseDto updateSubcategory(@PathVariable Long subcategoryId,
                                                    @RequestBody @Valid @NotNull SubcategoryRequestDto subcategory, @PathVariable Long wordListId) {
        return subcategoryService.updateSubcategory(wordListId, subcategoryId, subcategory);
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


}
