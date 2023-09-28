package com.pbl6.dictionaryappbe.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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

    @Column(name = "word", length = 100)
    private String word;

    @Column(name = "pos", length = 100)
    private String pos;

    @Column(name = "phonetics_us")
    private String phoneUs;

    @Column(name = "phonetics_uk")
    private String phoneticsUk;

    @Column(name = "audio_us")
    private String audioUs;

    @Column(name = "audio_uk")
    private String audioUk;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany
    @JoinTable(
            name = "vocab_def",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "def_id", referencedColumnName = "def_id"))
    List<Definition> definitions;

    @ManyToMany
    @JoinTable(
            name = "vocabulary_list_detail",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id"))
    List<Subcategory> subcategories;
}
