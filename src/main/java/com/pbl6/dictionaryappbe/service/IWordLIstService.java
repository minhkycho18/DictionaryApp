package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.persistence.WordList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IWordLIstService {
    List<WordList> getAll();
    void create(WordList wordList);
    WordList updateTitle(Long wordListId, WordList wordList);
    void delete(Long id);
}
