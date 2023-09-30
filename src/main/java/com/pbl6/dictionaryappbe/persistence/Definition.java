package com.pbl6.dictionaryappbe.persistence;

import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "definitions")
public class Definition {
    @Id
    @Column(name = "def_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long defId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String wordDesc;

    @Column(columnDefinition = "TEXT")
    private String examples;

    @ManyToMany(mappedBy = "definitions", fetch = FetchType.LAZY)
    List<Vocabulary> vocabularies;
}
