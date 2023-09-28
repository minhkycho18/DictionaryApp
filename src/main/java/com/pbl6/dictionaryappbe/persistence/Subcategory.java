package com.pbl6.dictionaryappbe.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subcategory")
public class Subcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subcategoryId;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer amountOfWord = 0;

    @Column
    private String createdBy;

    @OneToMany(mappedBy = "subcategory", fetch = FetchType.LAZY)
    private List<VocabularyCustom> vocabularyCustoms;

    @ManyToMany(mappedBy = "subcategories", fetch = FetchType.LAZY)
    List<Vocabulary> vocabularies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabulary_list_id", referencedColumnName = "vocabulary_list_id")
    private VocabularyList vocabularyList;
}
