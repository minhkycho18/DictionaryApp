package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.contribution_history.HistoryResponse;
import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;

import java.util.List;

public interface ContributionHistoryService {

    List<HistoryResponse> getAllHistory();

    void reviewContributionVocab(Long vocabId, UpdateDefaultVocabRequest updateDefaultVocabRequest);
}
