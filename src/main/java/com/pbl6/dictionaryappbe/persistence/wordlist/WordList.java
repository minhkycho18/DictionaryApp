package com.pbl6.dictionaryappbe.persistence.wordlist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "word_list", uniqueConstraints = @UniqueConstraint(columnNames = {"title", "user_id"}))
public class WordList implements Serializable {
    @Id
    @Column(name = "word_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordListId;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private String listDesc;

    @Column
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column
    private ListType listType;

    @OneToMany(mappedBy = "wordList", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Subcategory> subcategories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonIgnore
    private User user;
}
