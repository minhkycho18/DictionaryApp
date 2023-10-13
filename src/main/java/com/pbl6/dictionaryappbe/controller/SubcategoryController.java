package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.service.SubcategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;
    private final SubcategoryMapper subcategoryMapper;

    @Operation(summary = "Get all subcategories of WordList by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get data successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryDto.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @GetMapping("/{id}")
    public List<SubcategoryDto> getAllSubcategories(@PathVariable Long id) {
        List<Subcategory> subcategoryList = subcategoryService.getAllSubcategories(id);
        return subcategoryList.stream().map(subcategoryMapper::toSubcategoryDto).toList();
    }

    @Operation(summary = "Create a new subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PostMapping
    public SubcategoryDto createSubcategory(@Valid @RequestBody SubcategoryDto subcategory) {
        return subcategoryMapper.toSubcategoryDto(subcategoryService.createSubcategory(subcategory));
    }

    @Operation(summary = "Edit a subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Edit successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = SubcategoryDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data"),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @PutMapping("/{id}")
    public SubcategoryDto updateSubcategory(@PathVariable Long id, @RequestBody @Valid @NotNull SubcategoryDto subcategory) {
        return subcategoryMapper.toSubcategoryDto(subcategoryService.updateSubcategory(id, subcategory));
    }

    @Operation(summary = "Delete a subcategory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "403", description = "No permission to access this resource")})
    @DeleteMapping("/{id}")
    public String deleteSubcategory(@PathVariable Long id) {
        subcategoryService.deleteSubcategory(id);
        return "Delete successfully";
    }


}
