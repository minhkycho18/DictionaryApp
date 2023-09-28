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
    private long subcategoryId;

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "amount_of_word")
    private int amountOfWord;

    @Column(name = "created_by")
    private String createdBy;

    @OneToMany(mappedBy = "subcategory")
    private List<VocabularyCustom> vocabularyCustoms;

    @ManyToMany(mappedBy = "subcategories")
    List<Vocabulary> vocabularies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabulary_list_id", referencedColumnName = "vocabulary_list_id")
    private VocabularyList vocabularyList;

}
