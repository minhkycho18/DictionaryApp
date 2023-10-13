package com.pbl6.dictionaryappbe.persistence.leitner;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class LeitnerId implements Serializable {
    @Column(name = "vocab_id", nullable = false)
    private Long vocabId;
    @Column(name = "def_id", nullable = false)
    private Long defId;
    @Column(name = "user_id", nullable = false)
    private Long userId;
}
