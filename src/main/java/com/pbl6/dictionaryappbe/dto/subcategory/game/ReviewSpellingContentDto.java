package com.pbl6.dictionaryappbe.dto.subcategory.game;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReviewSpellingContentDto extends VocabularyQuestionDto{
    private String wordDesc;
    private String example;

    public ReviewSpellingContentDto(Long vocabId, Long defId, String word,
                                     String pos, String phoneUs, String phoneUk,
                                    String audioUs, String audioUk, String wordDesc, String example) {
        super(vocabId, defId, word, pos, phoneUs, phoneUk, audioUs, audioUk);
        this.wordDesc = wordDesc;
        this.example = example;
    }
}
