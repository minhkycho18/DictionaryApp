package com.pbl6.dictionaryappbe.persistence.vocabdef;

import lombok.Data;

import java.io.Serializable;

@Data
public class VocabDefId implements Serializable {
    private Long vocabId;
    private Long defId;
}
