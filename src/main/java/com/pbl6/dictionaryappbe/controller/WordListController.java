package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
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

    @GetMapping("/{id}")
    public List<WordList> getWordlists(@PathVariable Long id) {
        return wordListService.getAllByUser(id);
    }

    @GetMapping("/default")
    public List<WordList> getAllSystemWordlists() {
        return wordListService.getAllSystemWordList(RoleName.CONTENT_MANAGER);
    }

    @GetMapping("/public")
    public List<WordList> getAllPublicWordLists() {
        return wordListService.getAllPublicWordList();
    }

    @PostMapping
    public WordList createWordList(@RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.createWordList(wordList);
    }

    @PutMapping("/{id}")
    public WordList updateWordList(@PathVariable Long id, @RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListService.updateWordList(id, wordList);
    }

    @DeleteMapping("/{id}")
    public String deleteWordList(@PathVariable Long id) {
        wordListService.deleteWordList(id);
        return "Delete successfully";
    }
}
