package com.pbl6.dictionaryappbe.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "vocabulary_list")
public class VocabularyList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabularyListId;

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "list_desc")
    private String listDesc;

    @Column(name = "created_by")
    private String createdBy;

    @OneToMany(mappedBy = "vocabularyList")
    private List<Subcategory> subcategories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

}
