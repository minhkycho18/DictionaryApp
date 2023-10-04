package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.WordList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WordListService {

    List<WordList> getAll();

    void createWordList(WordListDto wordList);

    WordList updateTitle(Long wordListId, WordListDto wordList);

    void deleteWordList(Long id);
}
