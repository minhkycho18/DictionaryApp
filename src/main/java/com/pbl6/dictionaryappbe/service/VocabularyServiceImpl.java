package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.Vocabulary;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService{

    private final VocabularyRepository vocabularyRepository;

    @Override
    public List<Vocabulary> findByKeyword(String keyword) {
        return vocabularyRepository.findTop10ByWordStartsWith(keyword);
    }
}
