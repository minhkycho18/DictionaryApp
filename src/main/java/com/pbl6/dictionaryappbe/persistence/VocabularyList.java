package com.pbl6.dictionaryappbe.persistence;

import com.pbl6.dictionaryappbe.persistence.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vocabulary_list")
public class VocabularyList {
    @Id
    @Column(name = "vocabulary_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabularyListId;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private String listDesc;

    @Column
    private String createdBy;

    @OneToMany(mappedBy = "vocabularyList", fetch = FetchType.LAZY)
    private List<Subcategory> subcategories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}
