package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.contribution_history.HistoryResponse;
import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.mapper.VocabularyMapper;
import com.pbl6.dictionaryappbe.persistence.contribution_history.ContributionHistory;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import com.pbl6.dictionaryappbe.repository.ContributionHistoryRepository;
import com.pbl6.dictionaryappbe.repository.VocabDefRepository;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ContributionHistoryServiceImpl implements ContributionHistoryService {
    private final ContributionHistoryRepository historyRepository;
    private final VocabularyMapper vocabularyMapper;
    private final VocabDefRepository vocabDefRepository;
    private final VocabularyService vocabularyService;
    private final VocabularyRepository vocabularyRepository;

    @Override
    public List<HistoryResponse> getAllHistory() {
        List<ContributionHistory> histories = historyRepository.findAll();
        return histories.stream().map(item -> {
                    Vocabulary vocabulary = vocabularyRepository.findById(item.getVocabId())
                            .orElseThrow(() -> new EntityNotFoundException("Vocabulary not found"));
                    VocabDetailDto vocabDetailDto = vocabularyMapper.toVocabDetailDto(vocabulary);
                    return HistoryResponse.builder()
                            .historyId(item.getHistoryId())
                            .vocabulary(vocabDetailDto)
                            .statusOfReview(item.getStatus())
                            .confirmedAt(item.getConfirmedAt())
                            .confirmedBy(item.getConfirmedBy())
                            .build();
                })
                .toList();
    }

    @Override
    public void reviewContributionVocab(Long vocabId, UpdateDefaultVocabRequest updateDefaultVocabRequest) {
        vocabularyService.updateDefaultVocab(vocabId, updateDefaultVocabRequest);
        VocabularyStatus status;
        if (updateDefaultVocabRequest.getStatus() == VocabularyStatus.DEFAULT) {
            status = VocabularyStatus.APPROVED;
        } else {
            status = updateDefaultVocabRequest.getStatus();
        }
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        ContributionHistory contributionHistory = ContributionHistory.builder()
                .vocabId(vocabId)
                .status(status)
                .confirmedAt(LocalDateTime.now())
                .confirmedBy(user.getEmail())
                .build();
        historyRepository.save(contributionHistory);
    }
}
