package com.pbl6.dictionaryappbe.dto.subcategory;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GameType {
    @JsonProperty("review")
    REVIEW,
    @JsonProperty("flashcard")
    FLASHCARD,
    @JsonProperty("spelling")
    SPELLING,
    @JsonProperty("quiz")
    QUIZ
}
