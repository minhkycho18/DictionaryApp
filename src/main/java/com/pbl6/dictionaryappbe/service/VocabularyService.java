package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.dto.VocabularySearchDto;
import org.springframework.data.domain.Page;

public interface VocabularyService {
    Page<VocabularySearchDto> findByKeyword(String keyword, int offset, int limit);
}
