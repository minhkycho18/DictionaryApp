package com.pbl6.dictionaryappbe.dto.subcategory.game;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReviewSpellingContentDto extends VocabularyQuestionDto {
    private String wordDesc;
    private String example;

    public ReviewSpellingContentDto(VocabularyQuestionDto vocabularyQuestionDto, String wordDesc, String example) {
        super(vocabularyQuestionDto.getVocabId(),
                vocabularyQuestionDto.getDefId(),
                vocabularyQuestionDto.getWord(),
                vocabularyQuestionDto.getPos(),
                vocabularyQuestionDto.getPhoneUs(),
                vocabularyQuestionDto.getPhoneUk(),
                vocabularyQuestionDto.getAudioUs(),
                vocabularyQuestionDto.getAudioUk());
        this.wordDesc = wordDesc;
        this.example = example;
    }
}
