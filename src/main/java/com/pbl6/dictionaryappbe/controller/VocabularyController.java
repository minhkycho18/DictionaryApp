package com.pbl6.dictionaryappbe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vocab")
public class VocabularyController {
    @GetMapping
    public String hello(){
        return "Hello World";
    }
}
