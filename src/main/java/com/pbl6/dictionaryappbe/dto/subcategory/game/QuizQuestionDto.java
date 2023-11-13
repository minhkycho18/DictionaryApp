package com.pbl6.dictionaryappbe.dto.subcategory.game;

import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class QuizQuestionDto extends VocabularyQuestionDto{
    private String question;
    private Map<String, Boolean> result;

    public QuizQuestionDto(Long vocabId, Long defId, String word,
                           String pos, String phoneUs, String phoneUk,
                           String audioUs, String audioUk, String question, Map<String, Boolean> result) {
        super(vocabId, defId, word, pos, phoneUs, phoneUk, audioUs, audioUk);
        this.question = question;
        this.result = result;
    }
}
