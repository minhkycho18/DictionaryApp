package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;

import java.util.List;

public interface WordListService {

    WordListDto getWordListById(Long wordListId);

    List<WordListDto> getAllByUser();

    List<WordListDto> getAllSystemWordList(RoleName role);

    List<WordListDto> getAllPublicWordList();

    WordListDto createWordList(WordListDto wordList);

    WordListDto updateWordList(Long wordListId, WordListDto wordList);

    void deleteWordList(Long id);

    WordList getOwnedWordList(Long id);
}
