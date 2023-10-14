package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.service.SubcategoryService;
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

@Tag(name = "Subcategory")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/wordlist/{wordListId}/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    @Operation(summary = "Get all subcategories of WordList by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping
    public List<SubcategoryResponseDto> getAllSubcategories(@PathVariable Long wordListId) {
        return subcategoryService.getAllSubcategories(wordListId);
    }

    @Operation(summary = "Create a new subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping
    public SubcategoryResponseDto createSubcategory(@PathVariable Long wordListId,
                                                    @Valid @RequestBody SubcategoryRequestDto subcategory) {
        return subcategoryService.createSubcategory(wordListId, subcategory);
    }

    @Operation(summary = "Edit a subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PutMapping("/{subcategoryId}")
    public SubcategoryResponseDto updateSubcategory(@PathVariable Long subcategoryId,
                                                    @RequestBody @Valid @NotNull SubcategoryRequestDto subcategory) {
        return subcategoryService.updateSubcategory(subcategoryId, subcategory);
    }

    @Operation(summary = "Delete a subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @DeleteMapping("/{subcategoryId}")
    public String deleteSubcategory(@PathVariable Long subcategoryId) {
        subcategoryService.deleteSubcategory(subcategoryId);
        return "Delete successfully";
    }


}
