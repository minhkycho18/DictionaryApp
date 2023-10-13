package com.pbl6.dictionaryappbe.persistence.leitner;


import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vocab_leitner")
@IdClass(LeitnerId.class)
public class VocabLeitner {
    @Id
    private Long vocabId;

    @Id
    private Long defId;

    @Id
    private Long userId;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime lastLearning;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable=false, updatable=false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "def_id", referencedColumnName = "def_id", insertable=false, updatable=false),
            @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id", insertable=false, updatable=false)
    })
    private VocabDef vocabDef;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level", referencedColumnName = "level")
    private LevelLeitner levelLeitner;
}
