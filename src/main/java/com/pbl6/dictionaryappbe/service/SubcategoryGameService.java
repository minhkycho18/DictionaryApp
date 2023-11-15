package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.game.*;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;

import java.util.List;

public interface SubcategoryGameService {
    List<SubcategoryDetail> getRandomSubDetailByGameType(GameType gameType, Long subcategoryId, Long wordListId);

    NumberOfQuestion handleNumberOfQuestion(final GameType gameType, final Long subcategoryId);

    List<FlashcardQuestionDto> createFlashcardGame(List<SubcategoryDetail> vocabularyQuestionDtos);

    List<QuizQuestionDto> createQuizGame(List<SubcategoryDetail> vocabularyQuestionDtos);

    List<ReviewSpellingContentDto> createReviewSpellingGame(List<SubcategoryDetail> vocabularyQuestionDtos);

    void updateStatusGame(Long wordListId, Long subcategoryId, GameType gameType, List<VocabDefId> vocabDefs);
}
