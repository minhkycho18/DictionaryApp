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
@Table(name = "vocab_leitner", uniqueConstraints = @UniqueConstraint(columnNames = {"word","word_desc", "user_id"}))
public class VocabLeitner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vocabLeitnerId;

    @Column(name = "word", length = 100)
    private String word;

    @Column(name = "word_desc")
    private String wordDesc;

    @Column(name = "level", length = 30)
    private String level;

    @Column(name = "word_desc")
    private LocalDateTime lastLearning;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

}
