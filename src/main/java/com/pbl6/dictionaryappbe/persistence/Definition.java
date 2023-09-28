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
@Table(name = "definitions")
public class Definition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long defId;

    @Column(name = "word_desc", nullable = false, columnDefinition = "TEXT")
    private String wordDesc;

    @Column(columnDefinition = "TEXT")
    private String examples;

    @ManyToMany(mappedBy = "definitions", fetch = FetchType.LAZY)
    List<Vocabulary> vocabularies;
}
