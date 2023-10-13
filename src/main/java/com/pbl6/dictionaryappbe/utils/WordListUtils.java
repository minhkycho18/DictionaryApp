package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WordListUtils {

    @Autowired
    private WordListRepository wordListRepository;

    private WordListUtils() {

    }

    public static List<WordListDto> toResponseWordList(List<WordList> wordList, WordListMapper wordListMapper) {
        return wordList
                .stream()
                .map(wordListMapper::toWordListDto)
                .toList();
    }

}
