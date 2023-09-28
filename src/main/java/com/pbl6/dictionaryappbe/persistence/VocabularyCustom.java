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
@Table(name = "vocabulary_custom")
public class VocabularyCustom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabCustomId;

    @Column(length = 100, nullable = false)
    private String word;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String wordDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id")
    private Subcategory subcategory;
}
