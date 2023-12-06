package com.pbl6.dictionaryappbe.persistence.leitner;


import com.pbl6.dictionaryappbe.dto.leitner.LeitnerVocabCardGame;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NamedNativeQuery(
        name = "find_leitner_game",
        query = """
            WITH randDesc AS
                (
                    SELECT d.word_desc
                    FROM vocab_leitner vl
                    JOIN vocab_def vd
                        ON vd.vocab_id = vl.vocab_id
                        AND vd.def_id = vl.def_id
                    JOIN definitions d
                        ON d.def_id = vd.def_id
                    WHERE user_id = :userId
                    ORDER BY rand()
                ), leitner_game AS (
                    SELECT vl.vocab_id AS vocabId,
                           v.word,
                           v.pos,
                           v.audio_us AS audioUs,
                           v.audio_uk AS audioUk,
                           v.phonetics_us AS phoneUs,
                           v.phonetics_uk AS phoneUk,
                           vl.def_id AS defId,
                           vl.level AS level,
                           vl.last_learning AS lastLearning,
                           SUBSTRING_INDEX(
                               GROUP_CONCAT(randDesc.word_desc ORDER BY rand() SEPARATOR '***'), '***', 1) AS question,
                           d.word_desc AS answer
                    FROM vocab_leitner vl
                    CROSS JOIN randDesc
                    JOIN level_leitner ll
                        ON vl.level = ll.level
                    JOIN definitions d
                         ON d.def_id = vl.def_id
                    JOIN vocabularies v 
                         ON v.vocab_id = vl.vocab_id
                    WHERE vl.level = :level
                        AND (DATE_ADD(last_learning, INTERVAL ll.time HOUR) < CURRENT_TIMESTAMP()
                                 OR last_learning IS NULL)
                    GROUP BY vl.vocab_id, vl.def_id
                )
                SELECT *
                FROM leitner_game
                ORDER BY lastLearning DESC
                limit 30
        """,
        resultSetMapping = "leitner_game_dto"
)
@SqlResultSetMapping(
        name = "leitner_game_dto",
        classes = @ConstructorResult(
                targetClass = LeitnerVocabCardGame.class,
                columns = {
                        @ColumnResult(name = "vocabId", type = Long.class),
                        @ColumnResult(name = "defId", type = Long.class),
                        @ColumnResult(name = "word", type = String.class),
                        @ColumnResult(name = "pos", type = String.class),
                        @ColumnResult(name = "audioUs", type = String.class),
                        @ColumnResult(name = "audioUk", type = String.class),
                        @ColumnResult(name = "phoneUs", type = String.class),
                        @ColumnResult(name = "phoneUk", type = String.class),
                        @ColumnResult(name = "lastLearning", type = LocalDateTime.class),
                        @ColumnResult(name = "level", type = Integer.class),
                        @ColumnResult(name = "question", type = String.class),
                        @ColumnResult(name = "answer", type = String.class)
                }
        )
)
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
