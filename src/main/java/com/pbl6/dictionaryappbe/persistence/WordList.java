package com.pbl6.dictionaryappbe.persistence;

import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
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
@Table(name = "word_list", uniqueConstraints = @UniqueConstraint(columnNames = {"title", "user_id"}))
public class WordList {
    @Id
    @Column(name = "word_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordListId;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private String listDesc;

    @Column
    private String createdBy;

    @OneToMany(mappedBy = "wordList", fetch = FetchType.LAZY)
    private List<Subcategory> subcategories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}
