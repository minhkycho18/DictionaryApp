package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.persistence.Vocabulary;
import com.pbl6.dictionaryappbe.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vocab")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @GetMapping
    public List<Vocabulary> searchVocab(@RequestParam String keyword){
        return vocabularyService.findByKeyword(keyword);
    }
}
