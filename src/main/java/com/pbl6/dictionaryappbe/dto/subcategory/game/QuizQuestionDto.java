package com.pbl6.dictionaryappbe.dto.subcategory.game;

import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class QuizQuestionDto extends VocabularyQuestionDto {
    private String question;
    private Map<String, Boolean> result;

    public QuizQuestionDto(VocabularyQuestionDto vocabularyQuestionDto, String question, Map<String, Boolean> result) {
        super(vocabularyQuestionDto.getVocabId(),
                vocabularyQuestionDto.getDefId(),
                vocabularyQuestionDto.getWord(),
                vocabularyQuestionDto.getPos(),
                vocabularyQuestionDto.getPhoneUs(),
                vocabularyQuestionDto.getPhoneUk(),
                vocabularyQuestionDto.getAudioUs(),
                vocabularyQuestionDto.getAudioUk());
        this.question = question;
        this.result = result;
    }
}
