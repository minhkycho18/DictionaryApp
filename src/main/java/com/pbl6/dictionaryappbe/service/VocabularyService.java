package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import org.springframework.data.domain.Page;

public interface VocabularyService {
    Page<VocabDetailDto> findByKeyword(String keyword, int offset, int limit);
}
