package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySearchDto;
import com.pbl6.dictionaryappbe.mapper.VocabularyMapper;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabularyMapper vocabularyMapper;

    @Override
    public Page<VocabularySearchDto> findByKeyword(String keyword, int offset, int limit) {
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit, Sort.by("word").ascending());
        Page<Vocabulary> vocabularies = vocabularyRepository.findByWordStartsWith(keyword, pageable);
        return vocabularies.map(vocabularyMapper::toVocabSearchDto);
    }

    @Override
    public List<VocabularySearchDto> getVocabInfo(String word) {

        return null;
    }
}
