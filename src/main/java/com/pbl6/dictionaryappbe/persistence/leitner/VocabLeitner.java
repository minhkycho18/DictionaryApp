package com.pbl6.dictionaryappbe.persistence.leitner;


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
    @Column(name = "vocab_id")
    private Long vocabId;

    @Id
    @Column(name = "def_id")
    private Long defId;

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(length = 30)
    private String level;

    @Column
    private LocalDateTime lastLearning;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "def_id", referencedColumnName = "def_id"),
            @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id")
    })
    private VocabDef vocabDef;
}
