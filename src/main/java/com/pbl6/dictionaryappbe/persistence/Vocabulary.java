package com.pbl6.dictionaryappbe.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(length = 100, nullable = false)
    private String word;

    @Column( length = 100, nullable = false)
    private String pos;

    @Column(name = "phonetics_us")
    private String phoneUs;

    @Column(name = "phonetics_uk")
    private String phoneticsUk;

    @Column
    private String audioUs;

    @Column
    private String audioUk;

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private String modifiedBy;

    @ManyToMany
    @JoinTable(
            name = "vocab_def",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "def_id", referencedColumnName = "def_id"))
    private List<Definition> definitions;

    @ManyToMany
    @JoinTable(
            name = "vocabulary_list_detail",
            joinColumns = @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
            inverseJoinColumns = @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id"))
    private List<Subcategory> subcategories;
}
