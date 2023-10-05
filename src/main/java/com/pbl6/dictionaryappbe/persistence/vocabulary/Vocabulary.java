package com.pbl6.dictionaryappbe.persistence.vocabulary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vocabularies")
public class Vocabulary {
    @Id
    @Column(name = "vocab_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabId;

    @Column(length = 100, nullable = false)
    private String word;

    @Column(length = 100)
    private String pos;

    @Column(name = "phonetics_us")
    private String phoneUs;

    @Column(name = "phonetics_uk")
    private String phoneUk;

    @Column
    private String audioUs;

    @Column
    private String audioUk;

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private String modifiedBy;

    @Enumerated(EnumType.STRING)
    @Column
    private WordType wordType;

    @OneToMany(mappedBy = "vocabulary")
    @JsonIgnore
    private List<VocabDef> vocabDefs;
}
