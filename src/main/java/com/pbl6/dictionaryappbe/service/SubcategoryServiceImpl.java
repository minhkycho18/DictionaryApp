package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory.SubcategoryType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.SubcategoryRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final WordListRepository wordListRepository;

    @Override
    public Subcategory createSubcategory(SubcategoryDto subcategory) {
        Long wordListId = subcategory.getWordListId();
        WordList wordList = wordListRepository.findById(wordListId)
                                                .orElseThrow(() -> new EntityNotFoundException("WordList not found with ID: " + wordListId));
        Subcategory newSubcategory = Subcategory.builder()
                .title(subcategory.getTitle())
                .subcategoryType(SubcategoryType.valueOf(subcategory.getSubcategoryType().toUpperCase()))
                .wordList(wordList)

                .build();
        return subcategoryRepository.save(newSubcategory);
    }
}
