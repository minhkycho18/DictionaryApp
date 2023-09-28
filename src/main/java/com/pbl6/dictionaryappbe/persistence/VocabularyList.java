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
@RequiredArgsConstructor
@Entity
@Table(name = "vocabulary_list")
public class VocabularyList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabularyListId;

    @Column( length = 200, nullable = false)
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
