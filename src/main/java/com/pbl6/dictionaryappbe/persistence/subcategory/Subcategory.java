package com.pbl6.dictionaryappbe.persistence.subcategory;

import com.pbl6.dictionaryappbe.persistence.WordList;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subcategory", uniqueConstraints = @UniqueConstraint(columnNames = {"title", "word_list_id"}))
public class Subcategory {
    @Id
    @Column(name = "subcategory_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subcategoryId;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer amountOfWord = 0;

    @Column
    private String createdBy;

    @Enumerated(EnumType.STRING)
    @Column
    private SubcategoryType subcategoryType;

    @ManyToMany(mappedBy = "subcategories", fetch = FetchType.LAZY)
    private List<VocabDef> vocabDefs;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_list_id", referencedColumnName = "word_list_id")
    private WordList wordList;
}
