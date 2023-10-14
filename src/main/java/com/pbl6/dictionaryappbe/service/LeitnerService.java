package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.CreationVocabLeitnerRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;

import java.util.List;

public interface LeitnerService {
    void addVocabToLeitner(CreationVocabLeitnerRequestDto creationVocabLeitnerRequestDto);

    List<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level);
}
