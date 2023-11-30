package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.leitner.*;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;

import java.util.List;

public interface LeitnerService {
    void addVocabToLeitner(VocabLeitnerRequestDto vocabLeitnerRequestDto);

    List<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level);

    void modifyStatusLevelVocabLetiner(LevelLeitnerModificationRequestDto modificationRequestDto, StatusLevelDto statusLevel);

    List<LeitnerBoxDto> getAllUserLeitnerBoxes();

    List<LeitnerVocabCardGame> getLeitnerGameByLevel(Integer level);
}
