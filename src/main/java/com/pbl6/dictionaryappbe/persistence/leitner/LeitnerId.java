package com.pbl6.dictionaryappbe.persistence.leitner;

import lombok.Data;

import java.io.Serializable;

@Data
public class LeitnerId implements Serializable {
    private Long vocabId;
    private Long userId;
}
