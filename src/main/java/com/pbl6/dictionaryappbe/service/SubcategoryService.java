package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;

import java.util.List;

public interface SubcategoryService {

    List<SubcategoryResponseDto> getAllSubcategories(Long wordListId);

    List<SubcategoryDetail> getSubcategoryDetails(Long subcategories, List<VocabularySubcategoryRequestDto> vocabularies);

    List<SubcategoryDetailResponseDto> getAllVocabularies(Long subcategoryId);

    SubcategoryDetailResponseDto addVocabToSubcategory(Long wordlistId, Long subcategoryId, VocabularySubcategoryRequestDto vocabularySubcategoryRequestDto);

    CustomVocabularyResponseDto createCustomVocabulary(Long wordListId, CustomVocabularyRequestDto customVocabularyRequestDto);

    SubcategoryResponseDto createSubcategory(Long wordListId, SubcategoryRequestDto subcategory);

    SubcategoryResponseDto updateSubcategory(Long wordlistId, Long subcategoryId, SubcategoryRequestDto subcategory);

    void deleteVocabulariesOfSubcategory(Long wordListId, Long subcategoryId, List<SubcategoryDetail> vocabularies);

    void deleteSubcategories(Long wordlistId, List<Long> subcategoryId);

    Subcategory getOwnedSubcategory(Long wordListId, Long subcategoryId);
}
