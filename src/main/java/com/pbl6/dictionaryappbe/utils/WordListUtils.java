package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;

import java.util.List;

public class WordListUtils {

    private WordListUtils() {

    }

    public static List<WordListDto> toResponseWordList(List<WordList> wordList, WordListMapper wordListMapper) {
        return wordList
                .stream()
                .map(wordListMapper::toWordListDto)
                .toList();
    }
}
