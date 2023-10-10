package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.service.SubcategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;
    private final SubcategoryMapper subcategoryMapper;

    @PostMapping
    public SubcategoryDto createSubcategory(@Valid @RequestBody SubcategoryDto subcategory) {
        return subcategoryMapper.toSubcategoryDto(subcategoryService.createSubcategory(subcategory));
    }


}
