package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WordListService {

    List<WordList> getAllByUser();

    List<WordList> getAllSystemWordList(RoleName role);

    List<WordList> getAllPublicWordList();

    WordList createWordList(WordListDto wordList);

    WordList updateWordList(Long wordListId, WordListDto wordList);

    void deleteWordList(Long id);
}
