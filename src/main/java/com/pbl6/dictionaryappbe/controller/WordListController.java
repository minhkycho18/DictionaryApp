package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.persistence.WordList;
import com.pbl6.dictionaryappbe.service.WordListServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/wordlists")
public class WordListController{
    private final WordListServiceImpl wordListService;
    @GetMapping
    private List<WordList> getWordlists(){
        return wordListService.getAll();
    }
    @PostMapping
    private String createWordList(@RequestBody WordList wordList){
        Objects.requireNonNull(wordList, "Word list should not be null");
        wordListService.create(wordList);
        return "Add successfully";
    }

    @PutMapping("/{id}")
    private WordList updateWordList(@PathVariable Long id,@RequestBody WordList wordList){
        return wordListService.updateTitle(id,wordList);
    }

    @DeleteMapping("/{id}")
    private String updateWordList(@PathVariable Long id){
        wordListService.delete(id);
        return "Delete successfully";
    }
}
