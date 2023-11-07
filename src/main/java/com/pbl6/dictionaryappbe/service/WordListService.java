package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.wordlist.WordListRequestDto;
import com.pbl6.dictionaryappbe.dto.wordlist.WordListResponseDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;

import java.util.List;

public interface WordListService {

    WordListResponseDto getWordListById(Long wordListId);

    List<WordListResponseDto> getAllByUser();

    List<WordListResponseDto> getAllSystemWordList(RoleName role);

    List<WordListResponseDto> getAllPublicWordList();

    WordListResponseDto createWordList(WordListRequestDto wordList);

    WordListResponseDto cloneWordList(Long wordListId);

    WordListResponseDto updateWordList(Long wordListId, WordListRequestDto wordList);

    void deleteWordList(Long id);

    WordList getOwnedWordList(Long id);

    String generateUniqueTitle(String title);
}
