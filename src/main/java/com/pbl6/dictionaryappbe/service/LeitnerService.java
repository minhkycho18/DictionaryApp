package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.leitner.LeitnerBoxDto;
import com.pbl6.dictionaryappbe.dto.leitner.LevelLeitnerModificationRequestDto;
import com.pbl6.dictionaryappbe.dto.leitner.StatusLevelDto;
import com.pbl6.dictionaryappbe.dto.leitner.VocabLeitnerDetailDto;
import com.pbl6.dictionaryappbe.dto.leitner.VocabLeitnerRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;

import java.util.List;

public interface LeitnerService {
    VocabLeitnerDetailDto getInfoVocabLeitner(VocabLeitnerRequestDto leitnerRequestDto);

    void addVocabToLeitner(VocabLeitnerRequestDto vocabLeitnerRequestDto);

    List<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level);

    void modifyStatusLevelVocabLetiner(LevelLeitnerModificationRequestDto modificationRequestDto, StatusLevelDto statusLevel);

    List<LeitnerBoxDto> getAllUserLeitnerBoxes();
}
