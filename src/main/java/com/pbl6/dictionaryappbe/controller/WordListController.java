package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.service.WordListService;
import com.pbl6.dictionaryappbe.utils.WordListUtils;
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

    private final WordListMapper wordListMapper;

    @GetMapping
    public List<WordListDto> getWordlists() {
        return WordListUtils.toResponseWordList(wordListService.getAllByUser(), wordListMapper);
    }

    @GetMapping("/default")
    public List<WordListDto> getAllSystemWordlists() {
        List<WordList> wordList = wordListService.getAllSystemWordList(RoleName.CONTENT_MANAGER);
        return WordListUtils.toResponseWordList(wordList, wordListMapper);
    }

    @GetMapping("/public")
    public List<WordListDto> getAllPublicWordLists() {
        return WordListUtils.toResponseWordList(wordListService.getAllPublicWordList(), wordListMapper);
    }

    @PostMapping
    public WordListDto createWordList(@RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListMapper.toWordListDto(wordListService.createWordList(wordList));
    }

    @PutMapping("/{id}")
    public WordListDto updateWordList(@PathVariable Long id, @RequestBody @Valid @NotNull WordListDto wordList) {
        return wordListMapper.toWordListDto(wordListService.updateWordList(id, wordList));
    }

    @DeleteMapping("/{id}")
    public String deleteWordList(@PathVariable Long id) {
        wordListService.deleteWordList(id);
        return "Delete successfully";
    }
}
