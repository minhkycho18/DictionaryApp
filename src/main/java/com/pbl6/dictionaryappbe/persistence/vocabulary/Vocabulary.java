package com.pbl6.dictionaryappbe.persistence.vocabulary;

import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
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
@Table(name = "vocabularies", uniqueConstraints = @UniqueConstraint(columnNames = {"word", "pos"}))
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

    @ManyToMany
    @JoinTable(
            name = "vocab_def",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "def_id", referencedColumnName = "def_id"))
    private List<Definition> definitions;

    @ManyToMany
    @JoinTable(
            name = "subcategory_detail",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id"))
    private List<Subcategory> subcategories;

    @OneToMany(mappedBy = "vocabulary")
    private List<VocabLeitner> vocabLeitners;
}
