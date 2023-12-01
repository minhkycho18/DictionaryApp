package com.pbl6.dictionaryappbe.repository.leitner;

import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface LeitnerDao {
    Page<VocabularyLeitnerDetailDto> getVocabInLeitnerBox(Integer level, Long userId, String keyword,
                                                          String pos, Pageable pageable);
}
