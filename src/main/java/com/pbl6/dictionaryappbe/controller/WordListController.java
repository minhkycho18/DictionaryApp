package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.service.WordListService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Wordlist")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/wordlists")
public class WordListController {

    private final WordListService wordListService;

    @GetMapping
    public List<WordList> getWordlists() {
        return wordListService.getAll();
    }

    @PostMapping
    public WordList createWordList(@RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.createWordList(wordList);
    }

    @PutMapping("/{id}")
    public WordList updateWordList(@PathVariable Long id, @RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.updateTitle(id, wordList);
    }

    @DeleteMapping("/{id}")
    public String deleteWordList(@PathVariable Long id) {
        wordListService.deleteWordList(id);
        return "Delete successfully";
    }
}
