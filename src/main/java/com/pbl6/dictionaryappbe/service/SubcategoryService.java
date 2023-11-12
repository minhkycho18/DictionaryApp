package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.GameType;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.subcategory.VocabularyQuestion;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;

import java.util.List;

public interface SubcategoryService {

    List<SubcategoryResponseDto> getAllSubcategories(Long wordListId);

    List<SubcategoryDetail> getSubcategoryDetails(Long subcategories, List<VocabularySubcategoryRequestDto> vocabularies);

    List<SubcategoryDetailResponseDto> getAllVocabularies(Long wordListId, Long subcategoryId);

    SubcategoryDetailResponseDto addVocabToSubcategory(Long wordlistId, Long subcategoryId, VocabularySubcategoryRequestDto vocabularySubcategoryRequestDto);

    ContributionResponseDto contributeVocabulary(Long wordListId, ContributionRequestDto customVocabularyRequestDto);

    SubcategoryResponseDto createSubcategory(Long wordListId, String title);

    Subcategory cloneSubcategory(Long oldSubcategoryId, Long newSubcategoryId);

    void deleteVocabulariesOfSubcategory(Long wordListId, Long subcategoryId, List<SubcategoryDetail> vocabularies);

    void deleteSubcategories(Long wordlistId, List<Long> subcategoryId);

    VocabularyQuestion<?> createGame(GameType gameType, Long subcategoryId, Long wordListId);

    Subcategory getOwnedSubcategory(Long wordListId, Long subcategoryId);
}
