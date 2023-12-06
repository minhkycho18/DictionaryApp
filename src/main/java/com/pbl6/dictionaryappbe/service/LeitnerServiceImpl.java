package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.leitner.*;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.InvalidRequestDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.LeitnerMapper;
import com.pbl6.dictionaryappbe.persistence.leitner.LeitnerId;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.repository.LevelLeitnerRepository;
import com.pbl6.dictionaryappbe.repository.leitner.LeitnerRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LeitnerServiceImpl implements LeitnerService {
    private final LeitnerRepository leitnerRepository;
    private final LevelLeitnerRepository levelLeitnerRepository;
    private final LeitnerMapper leitnerMapper;

    private final Random rand = new Random();

    @Override
    @Transactional
    public void addVocabToLeitner(List<VocabLeitnerRequestDto> leitnerRequestDto) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        List<String> vocabDefIds = leitnerRequestDto.stream()
                .map(vocabLeitnerRequestDto -> vocabLeitnerRequestDto.getVocabId() + "-" + vocabLeitnerRequestDto.getDefId())
                .toList();
        List<VocabLeitner> vocabDefs = leitnerRepository.findAllByVocabDefId(vocabDefIds);
        if(!vocabDefs.isEmpty()) {
            throw new DuplicateDataException("Request have a vocabulary already exists in Leitner");
        }
        List<VocabLeitner> leitners =  leitnerRequestDto.stream()
                .map(vocabDef -> VocabLeitner.builder()
                        .vocabId(vocabDef.getVocabId())
                        .defId(vocabDef.getDefId())
                        .userId(user.getUserId())
                        .levelLeitner(levelLeitnerRepository.findById(0)
                                .orElseThrow(() -> new RecordNotFoundException("Level leitner not found")))
                        .lastLearning(null)
                        .build())
                .toList();
        leitnerRepository.saveAll(leitners);
    }

    @Override
    public Page<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level, String keyword, String pos,
                                                              int offset, int limit) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit);
        return leitnerRepository.getVocabInLeitnerBox(level, user.getUserId(), keyword, pos, pageable);
    }

    @Override
    @Transactional
    public void modifyStatusLevelVocabLetiner(
            LevelLeitnerModificationRequestDto leitnerModificationRequestDto,
            StatusLevelDto statusLevel
    ) {
        final int currentLevel = leitnerModificationRequestDto.getLevel();
        final User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        leitnerModificationRequestDto.getVocabLeitnerRequestDtoList().forEach(vocabLeitnerRequestDto -> {
            LeitnerId leitnerId = LeitnerId.builder()
                    .vocabId(vocabLeitnerRequestDto.getVocabId())
                    .defId(vocabLeitnerRequestDto.getDefId())
                    .userId(user.getUserId())
                    .build();
            VocabLeitner vocabLeitner = leitnerRepository.findById(leitnerId)
                    .orElseThrow(() -> new RecordNotFoundException("Vocab leitner not found"));
            switch (statusLevel) {
                case UP -> {
                    if (currentLevel < 7) {
                        vocabLeitner.setLevelLeitner(levelLeitnerRepository.findById(currentLevel + 1)
                                .orElseThrow(() -> new RecordNotFoundException("Level leitner not found")));
                    }
                    // case: up level from 0 to 1 --> continue
                    if (currentLevel > 1) vocabLeitner.setLastLearning(LocalDateTime.now());
                }
                case DOWN -> {
                    if (currentLevel > 1) {
                        vocabLeitner.setLevelLeitner(levelLeitnerRepository.findById(currentLevel - 1)
                                .orElseThrow(() -> new RecordNotFoundException("Level leitner not found")));
                    }
                    vocabLeitner.setLastLearning(LocalDateTime.now());
                }
                default -> throw new ResponseStatusException(HttpStatusCode.valueOf(400), "Invalid Level Data");
            }
            leitnerRepository.save(vocabLeitner);
        });
    }

    @Override
    public List<LeitnerBoxDto> getAllUserLeitnerBoxes() {
        final User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        List<LevelLeitner> levelLeitners = levelLeitnerRepository.findAll();
        levelLeitners.forEach(levelLeitner -> {
            List<VocabLeitner> vocabLeitners = levelLeitner.getVocabLeitners();
            levelLeitner.setVocabLeitners(vocabLeitners.stream()
                    .filter(vocabLeitner -> Objects.equals(vocabLeitner.getUser().getUserId(), user.getUserId()))
                    .toList()
            );
        });
        return MapperUtils.toTargetList(leitnerMapper::levelLeitnerToLeitnerBoxDto, levelLeitners);
    }

    @Override
    public List<LeitnerVocabCardGame> getLeitnerGameByLevel(Integer level) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        List<LeitnerVocabCardGame> cardGameList = leitnerRepository.findVocabLeitnerGameByLevel(level, user.getUserId());

        cardGameList.forEach(leitnerVocabCardGame -> {
            // set random percentage result
            if (rand.nextBoolean()) {
                leitnerVocabCardGame.setQuestion(leitnerVocabCardGame.getAnswer());
            }
            String currentQuestion = leitnerVocabCardGame.getQuestion();
            String currentAnswer = leitnerVocabCardGame.getAnswer();
            leitnerVocabCardGame.setResult(currentQuestion.equals(currentAnswer));
        });
        return cardGameList;
    }

    @Override
    @Transactional
    public void removeVocabLeitner(List<VocabLeitnerRequestDto> vocabLeitnerRequestDto) {
        List<String> vocabDefIds = vocabLeitnerRequestDto.stream()
                .map(vocabLeitner -> vocabLeitner.getVocabId() + "-" + vocabLeitner.getDefId())
                .toList();
        List<VocabLeitner> vocabLeitners = leitnerRepository.findAllByVocabDefId(vocabDefIds);
        if(vocabLeitnerRequestDto.size() != vocabLeitners.size())
            throw new InvalidRequestDataException("Vocab Leitner not found");
        leitnerRepository.deleteAll(vocabLeitners);
    }
}
