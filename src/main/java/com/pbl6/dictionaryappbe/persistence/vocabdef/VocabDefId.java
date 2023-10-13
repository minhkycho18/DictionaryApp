package com.pbl6.dictionaryappbe.persistence.vocabdef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VocabDefId implements Serializable {
    private Long vocabId;
    private Long defId;
}
