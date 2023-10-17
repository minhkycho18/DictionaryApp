package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryResponseDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;

import java.util.List;

public interface SubcategoryService {

    List<SubcategoryResponseDto> getAllSubcategories(Long wordListId);

    List<VocabularySubcategoryResponseDto> getAllVocabularies(Long subcategoryId);

    SubcategoryResponseDto createSubcategory(Long wordListId, SubcategoryRequestDto subcategory);

    SubcategoryResponseDto updateSubcategory(Long subcategoryId, SubcategoryRequestDto subcategory);

    void deleteSubcategory(Long subcategoryId);

    Subcategory getOwnedSubcategory(Long subcategoryId);

    void addVocabToSubcategory(Long subcategoryId, VocabularySubcategoryRequestDto vocabularySubcategoryRequestDto);
}
