package com.pbl6.dictionaryappbe.persistence.contribution_history;

import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "history_contribution")
public class ContributionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    @Column
    private Long vocabId;
    @Column
    @Enumerated(EnumType.STRING)
    private VocabularyStatus status;
    @Column
    private LocalDateTime confirmedAt;
    @Column
    private String confirmedBy;
}
