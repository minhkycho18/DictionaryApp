package com.pbl6.dictionaryappbe.service;


import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VocabularyService {
    List<String> findAllPos();

    Page<VocabDetailDto> findByKeyword(String keyword, String pos, int offset, int limit);

    void setInfoVocabOfUser(Page<VocabDetailDto> vocabDetailDtos, Page<Vocabulary> vocabularies, User user);

    VocabDetailDto updateDefaultVocab(Long vocabId, UpdateDefaultVocabRequest updateDefaultVocabRequest);
}
