package com.pbl6.dictionaryappbe.dto.contribution_history;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryResponse {
    private Long historyId;
    private VocabDetailDto vocabulary;
    @Enumerated(EnumType.STRING)
    private VocabularyStatus statusOfReview;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime confirmedAt;
    private String confirmedBy;

}
