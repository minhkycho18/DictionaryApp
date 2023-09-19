package com.pbl6.dictionaryappbe.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vocabularies", uniqueConstraints = @UniqueConstraint(columnNames = {"word","pos"}))
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabId;

    @Column(length = 100)
    private String word;

    @Column(length = 100)
    private String pos;

    @Column(name = "phonetics_us")
    private String phoneUs;

    @Column(name = "phonetics_uk")
    private String phoneticsUk;

    @Column(name = "audio_us")
    private String audioUs;

    @Column(name = "audio_uk")
    private String audioUk;

    @ManyToMany
    @JoinTable(
            name = "vocab_def",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocabId"),
            inverseJoinColumns = @JoinColumn(name = "def_id", referencedColumnName = "defId"))
    List<Definition> definitions;
}
