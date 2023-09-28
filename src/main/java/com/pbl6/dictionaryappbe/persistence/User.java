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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "name", length = 150)
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<VocabularyList> vocabularyLists;

    @OneToMany(mappedBy = "user")
    private List<VocabLeitner> vocabLeitners;

}
