package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.leitner.*;
import com.pbl6.dictionaryappbe.dto.definition.DefinitionLeitnerDetailDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.FieldNotNullException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.LeitnerMapper;
import com.pbl6.dictionaryappbe.persistence.leitner.LeitnerId;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.repository.LeitnerRepository;
import com.pbl6.dictionaryappbe.repository.LevelLeitnerRepository;
import com.pbl6.dictionaryappbe.repository.VocabDefRepository;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;

@Service
@RequiredArgsConstructor
public class LeitnerServiceImpl implements LeitnerService {
    private final VocabDefRepository vocabDefRepository;
    private final LeitnerRepository leitnerRepository;
    private final LevelLeitnerRepository levelLeitnerRepository;
    private final VocabularyRepository vocabularyRepository;
    private final LeitnerMapper leitnerMapper;

    private final Random rand = new Random();

    @Override
    @Transactional
    public void addVocabToLeitner(VocabLeitnerRequestDto leitnerRequestDto) {
        VocabDef vocabDef =
                vocabDefRepository.findById(new VocabDefId(leitnerRequestDto.getVocabId(), leitnerRequestDto.getDefId()))
                        .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
        if (leitnerRepository.existsByVocabDef(vocabDef)) {
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

    @Override
    public List<VocabularyLeitnerDetailDto> showVocabsByLevel(Integer level) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        List<VocabLeitner> vocabLeitnerList = leitnerRepository.findByLevelLeitner_LevelAndUserId(level, user.getUserId());
        Map<Long, List<VocabLeitner>> leitnerByVocabsId = vocabLeitnerList.stream()
                .collect(Collectors.groupingBy(VocabLeitner::getVocabId));

        List<VocabularyLeitnerDetailDto> leitnerDetailDtoList =
                leitnerByVocabsId.entrySet().stream()
                        // Map leitnerByVocabsId to List<VocabularyLeitnerDetailDto>
                        .map(leitnerEntry -> {
                            Vocabulary vocabulary = vocabularyRepository.findById(leitnerEntry.getKey())
                                    .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
                            return VocabularyLeitnerDetailDto.builder()
                                    .vocabId(vocabulary.getVocabId())
                                    .word(vocabulary.getWord())
                                    .pos(vocabulary.getPos())
                                    .shortDetailDtos(leitnerEntry.getValue().stream()
                                            .map(leitnerMapper::vocabLeitnerToDefinition)
                                            .toList())
                                    .build();
                        })
                        // Descending sort the list DTOs based on the maximum studyTime value.
                        .sorted(comparing(vocabularyLeitnerDetailDto ->
                                vocabularyLeitnerDetailDto.getShortDetailDtos().stream()
                                        .map(DefinitionLeitnerDetailDto::getStudyTime)
                                        .max(comparing(Function.identity()))
                                        .orElseThrow(() -> new FieldNotNullException("Study time must not be null"))
                        ))
                        .toList();
        // Sort list definitions by study times
        leitnerDetailDtoList.forEach(vocabularyLeitnerDetailDto ->
                vocabularyLeitnerDetailDto.setShortDetailDtos(
                        vocabularyLeitnerDetailDto.getShortDetailDtos().stream()
                                .sorted(comparing(DefinitionLeitnerDetailDto::getStudyTime))
                                .toList()
                )
        );
        return leitnerDetailDtoList;
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
            if(rand.nextBoolean()) {
                leitnerVocabCardGame.setQuestion(leitnerVocabCardGame.getAnswer());
            }
            String currentQuestion = leitnerVocabCardGame.getQuestion();
            String currentAnswer = leitnerVocabCardGame.getAnswer();
            leitnerVocabCardGame.setResult(currentQuestion.equals(currentAnswer));
        });
        return cardGameList;
    }
}
