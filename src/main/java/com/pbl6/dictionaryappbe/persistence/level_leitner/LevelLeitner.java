package com.pbl6.dictionaryappbe.persistence.level_leitner;

import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "level_leitner")
public class LevelLeitner {
    @Id
    @Column(name = "level", nullable = false)
    private Integer level;

    @Column(length = 50)
    private String name;

    private Integer time;

    @OneToMany(mappedBy = "levelLeitner")
    private List<VocabLeitner> vocabLeitners;
}