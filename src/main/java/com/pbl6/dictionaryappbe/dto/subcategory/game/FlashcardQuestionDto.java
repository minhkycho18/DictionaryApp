package com.pbl6.dictionaryappbe.dto.subcategory.game;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class FlashcardQuestionDto extends VocabularyQuestionDto{
    private String question;
    private Boolean result;

    public FlashcardQuestionDto(VocabularyQuestionDto vocabularyQuestionDto) {
        super(vocabularyQuestionDto.getVocabId(),
                vocabularyQuestionDto.getDefId(),
                vocabularyQuestionDto.getWord(),
                vocabularyQuestionDto.getPos(),
                vocabularyQuestionDto.getPhoneUs(),
                vocabularyQuestionDto.getPhoneUk(),
                vocabularyQuestionDto.getAudioUs(),
                vocabularyQuestionDto.getAudioUk(),
                vocabularyQuestionDto.getIsReview(),
                vocabularyQuestionDto.getIsFlashcard(),
                vocabularyQuestionDto.getIsSpelling(),
                vocabularyQuestionDto.getIsQuiz());
    }
}