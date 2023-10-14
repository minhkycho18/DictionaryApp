package com.pbl6.dictionaryappbe.dto.leitner;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum StatusLevelDto {
    @JsonProperty("up")
    UP,
    @JsonProperty("down")
    DOWN
}
