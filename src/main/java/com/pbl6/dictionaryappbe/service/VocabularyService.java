package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySearchDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VocabularyService {
    Page<VocabularySearchDto> findByKeyword(String keyword, int offset, int limit);
    List<VocabDetailDto> getVocabInfo(String word);
}
