package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;

import java.util.List;

public class MapperUtils {

    private MapperUtils() {

    }

    public static List<WordListDto> toResponseWordList(List<WordList> wordList, WordListMapper wordListMapper) {
        return wordList
                .stream()
                .map(wordListMapper::toWordListDto)
                .toList();
    }

    public static List<SubcategoryResponseDto> toResponseSubcategory(List<Subcategory> subcategories, SubcategoryMapper subcategoryMapper) {
        return subcategories
                .stream()
                .map(subcategoryMapper::toSubcategoryResponseDto)
                .toList();
    }
}
