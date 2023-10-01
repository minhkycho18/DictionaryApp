package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;

import java.util.List;

public interface VocabularyService {
    List<Vocabulary> findByKeyword(String keyword, int offset, int limit);
}
