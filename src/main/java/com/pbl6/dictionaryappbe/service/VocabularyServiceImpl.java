package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabularyRepository vocabularyRepository;

    @Override
    public List<Vocabulary> findByKeyword(String keyword, int offset, int limit) {
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit);
        return vocabularyRepository.findByWordStartsWith(keyword, pageable);
    }
}
