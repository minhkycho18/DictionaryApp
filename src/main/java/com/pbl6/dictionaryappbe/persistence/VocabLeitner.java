package com.pbl6.dictionaryappbe.persistence;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "vocab_leitner", uniqueConstraints = @UniqueConstraint(columnNames = {"word","word_desc","user_id"}))
public class VocabLeitner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabLeitnerId;

    @Column(length = 100, nullable = false)
    private String word;

    @Column(nullable = false)
    private String wordDesc;

    @Column(length = 30)
    private String level;

    @Column()
    private LocalDateTime lastLearning;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}
