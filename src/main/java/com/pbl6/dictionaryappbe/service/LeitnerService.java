package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.leitner.*;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LeitnerService {
    void addVocabToLeitner(VocabLeitnerRequestDto vocabLeitnerRequestDto);

    Page<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level, String keyword, String pos, int offset, int limit);

    void modifyStatusLevelVocabLetiner(LevelLeitnerModificationRequestDto modificationRequestDto, StatusLevelDto statusLevel);

    List<LeitnerBoxDto> getAllUserLeitnerBoxes();

    List<LeitnerVocabCardGame> getLeitnerGameByLevel(Integer level);

    void removeVocabLeitner(List<VocabLeitnerRequestDto> vocabLeitnerRequestDto);
}
