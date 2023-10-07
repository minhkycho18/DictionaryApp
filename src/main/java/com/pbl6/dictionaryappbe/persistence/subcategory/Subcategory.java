package com.pbl6.dictionaryappbe.persistence.subcategory;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
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

    @OneToMany(mappedBy = "subcategory", fetch = FetchType.LAZY)
    private List<SubcategoryDetail> subcategoryDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_list_id", referencedColumnName = "word_list_id")
    private WordList wordList;
}
