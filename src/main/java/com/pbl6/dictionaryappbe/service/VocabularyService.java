package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.Vocabulary;

import java.util.List;

public interface VocabularyService {
    List<Vocabulary> findByKeyword(String keyword);
}
