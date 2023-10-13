package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.CreationVocabLeitnerRequestDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import com.pbl6.dictionaryappbe.repository.LeitnerRepository;
import com.pbl6.dictionaryappbe.repository.LevelLeitnerRepository;
import com.pbl6.dictionaryappbe.repository.VocabDefRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class LeitnerServiceImpl implements LeitnerService {
    private final VocabDefRepository vocabDefRepository;
    private final LeitnerRepository leitnerRepository;
    private final LevelLeitnerRepository levelLeitnerRepository;

    @Override
    @Transactional
    public void addVocabToLeitner(CreationVocabLeitnerRequestDto leitnerRequestDto) {
        VocabDef vocabDef =
                vocabDefRepository.findById(new VocabDefId(leitnerRequestDto.getVocabId(), leitnerRequestDto.getDefId()))
                        .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
        if(leitnerRepository.existsByVocabDef(vocabDef)) {
            throw new DuplicateDataException("This vocabulary already exists in Leitner");
        }
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        VocabLeitner vocabLeitner = VocabLeitner.builder()
                .vocabId(leitnerRequestDto.getVocabId())
                .defId(leitnerRequestDto.getDefId())
                .userId(user.getUserId())
                .levelLeitner(levelLeitnerRepository.findById(0)
                        .orElseThrow(() -> new RecordNotFoundException("Level leitner not found")))
                .user(user)
                .vocabDef(vocabDef)
                .build();
        leitnerRepository.save(vocabLeitner);
    }
}
