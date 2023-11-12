package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.GameType;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.subcategory.VocabularyQuestion;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.SubcategoryDetailMapper;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.*;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import com.pbl6.dictionaryappbe.utils.SubcategoryDetailUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final WordListRepository wordListRepository;
    private final SubcategoryMapper subcategoryMapper;
    private final VocabDefRepository vocabDefRepository;
    private final SubcategoryDetailRepository subcategoryDetailRepository;
    private final SubcategoryDetailMapper subcategoryDetailMapper;
    private final VocabularyRepository vocabularyRepository;
    private final DefinitionRepository definitionRepository;

    @Override
    public List<SubcategoryResponseDto> getAllSubcategories(Long wordListId) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        WordList wordList = wordListRepository.findById(wordListId)
                .orElseThrow(() -> new RecordNotFoundException("WordList not found with ID: " + wordListId));
        assert user != null;
        if (wordList.getListType() == ListType.PRIVATE
                && !wordList.getUser().getUserId().equals(user.getUserId())) {
            throw new AccessDeniedException("You do not have permission to access this WordList");
        }
        List<Subcategory> subcategories = subcategoryRepository.findAllByWordList(wordList);
        return MapperUtils.toTargetList(subcategoryMapper::toSubcategoryResponseDto, subcategories);
    }

    @Override
    public List<SubcategoryDetail> getSubcategoryDetails(Long subcategoryId, List<VocabularySubcategoryRequestDto> vocabularies) {
        List<SubcategoryDetailId> subcategoryDetailIds = vocabularies.stream()
                .map(vocab -> new SubcategoryDetailId(vocab.getVocabId(), vocab.getDefId(), subcategoryId)).toList();
        return subcategoryDetailIds.stream().map(id ->
                        subcategoryDetailRepository.findById(id).orElseThrow(
                                () -> new EntityNotFoundException("Vocabulary not found")
                        ))
                .toList();
    }

    @Override
    public List<SubcategoryDetailResponseDto> getAllVocabularies(Long wordListId, Long subcategoryId) {
        boolean isOwnSubcategory = false;
        List<SubcategoryDetail> vocabularies;
        try {
            getOwnedSubcategory(wordListId, subcategoryId);
            isOwnSubcategory = true;
        } catch (AccessDeniedException e) {
        }
        if (isOwnSubcategory) {
            vocabularies = subcategoryDetailRepository.findAllBySubcategoryId(subcategoryId);
        } else {
            vocabularies = subcategoryDetailRepository.findAllDefaultVocabBySubcategoryId(subcategoryId);
        }
        return MapperUtils.toTargetList(subcategoryDetailMapper::toSubcategoryDetailResponseDto, SubcategoryDetailUtils.filterDeletedVocabulary(vocabularies));
    }

    @Override
    @Transactional
    public ContributionResponseDto contributeVocabulary(Long wordListId, ContributionRequestDto contributionVocabulary) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        Subcategory subcategory = getOwnedSubcategory(wordListId, contributionVocabulary.getSubcategoryId());
        List<SubcategoryDetail> subcategoryDetails = new ArrayList<>();
        Vocabulary newVocab = vocabularyRepository.save(Vocabulary.builder()
                .word(contributionVocabulary.getWord())
                .pos(contributionVocabulary.getPos())
                .phoneUk(contributionVocabulary.getPhoneUk())
                .phoneUs(contributionVocabulary.getPhoneUs())
                .audioUs(contributionVocabulary.getAudioUs())
                .audioUk(contributionVocabulary.getAudioUk())
                .contributedAt(LocalDateTime.now())
                .contributedBy(user.getEmail())
                .status(VocabularyStatus.PENDING)
                .build());
        contributionVocabulary.getDefinition().forEach(definition -> {
            Definition newDef = definitionRepository.save(Definition.builder()
                    .wordDesc(definition.getWordDesc())
                    .examples(definition.getExample())
                    .build());
            VocabDef newVocabDef = vocabDefRepository.save(VocabDef.builder()
                    .vocabId(newVocab.getVocabId())
                    .defId(newDef.getDefId())
                    .vocabulary(newVocab)
                    .definition(newDef)
                    .isDeleted(false)
                    .build());
            subcategoryDetails.add(subcategoryDetailRepository.save(SubcategoryDetail.builder()
                    .vocabId(newVocab.getVocabId())
                    .defId(newDef.getDefId())
                    .subcategoryId(subcategory.getSubcategoryId())
                    .isQuiz(false)
                    .isReview(false)
                    .isFlashcard(false)
                    .lastLearning(null)
                    .vocabDef(newVocabDef)
                    .build()));
            subcategory.setAmountOfWord(subcategory.getAmountOfWord() + 1);
        });
        return subcategoryDetailMapper.toContributionResponseDto(subcategoryDetails);
    }

    @Override
    @Transactional
    public SubcategoryDetailResponseDto addVocabToSubcategory(Long wordlistId, Long subcategoryId,
                                                              VocabularySubcategoryRequestDto vocabularySubcategoryRequestDto) {
        Subcategory subcategory = getOwnedSubcategory(wordlistId, subcategoryId);
        VocabDef vocabDef = vocabDefRepository.findById(new VocabDefId(vocabularySubcategoryRequestDto.getVocabId(),
                        vocabularySubcategoryRequestDto.getDefId()))
                .orElseThrow(() -> new RecordNotFoundException("Invalid vocabulary"));
        if (vocabDef.isDeleted()) {
            throw new RecordNotFoundException("Invalid vocabulary");
        }
        if (subcategoryDetailRepository.findById(
                new SubcategoryDetailId(vocabDef.getVocabId(),
                        vocabDef.getDefId(),
                        subcategoryId)).isPresent()) {
            throw new DuplicateDataException("This vocabulary is existed");
        }
        SubcategoryDetail subcategoryDetail = subcategoryDetailRepository.save(SubcategoryDetail.builder()
                .vocabId(vocabDef.getVocabId())
                .defId(vocabDef.getDefId())
                .subcategoryId(subcategory.getSubcategoryId())
                .isReview(false)
                .isFlashcard(false)
                .isQuiz(false)
                .lastLearning(null)
                .vocabDef(vocabDef)
                .build());
        subcategory.setAmountOfWord(subcategory.getAmountOfWord() + 1);
        return subcategoryDetailMapper.toSubcategoryDetailResponseDto(subcategoryDetail);
    }

    @Override
    @Transactional
    public SubcategoryResponseDto createSubcategory(Long wordListId, String title) {
        WordList wordList = wordListRepository.findByUserAndWordListId(AuthenticationUtils.getUserFromSecurityContext(), wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        if (subcategoryRepository.findByTitleAndWordList(title, wordList) != null) {
            throw new DuplicateDataException("Title's subcategory is existed");
        }
        Subcategory newSubcategory = Subcategory.builder()
                .title(title)
                .amountOfWord(0)
                .wordList(wordList)
                .subcategoryDetails(new ArrayList<>())
                .build();
        return subcategoryMapper.toSubcategoryResponseDto(subcategoryRepository.save(newSubcategory));
    }

    @Override
    @Transactional
    public Subcategory cloneSubcategory(Long sourceSubcategoryId, Long targetSubcategoryId) {
        Subcategory targetSubcategory = subcategoryRepository.findById(targetSubcategoryId).orElseThrow(
                () -> new RecordNotFoundException("Subcategory not found with ID: " + targetSubcategoryId)
        );
        WordList targetWordList = targetSubcategory.getWordList();
        //Get all subcategory_detail of old subcategory
        List<SubcategoryDetail> subcategoryDetails = SubcategoryDetailUtils.filterDeletedVocabulary(
                subcategoryDetailRepository.findAllBySubcategoryId(sourceSubcategoryId)
        );
        //Get all default vocab and convert to dto
        List<VocabularySubcategoryRequestDto> defaultVocabularies = subcategoryDetails.stream()
                .filter(subcategoryDetail -> subcategoryDetail.getVocabDef().getVocabulary().getStatus() == VocabularyStatus.DEFAULT)
                .map(subcategoryDetail -> new VocabularySubcategoryRequestDto(subcategoryDetail.getVocabId(), subcategoryDetail.getDefId()))
                .toList();
        //Add all default vocab
        defaultVocabularies.forEach(vocab -> {
            try {
                addVocabToSubcategory(targetWordList.getWordListId(),
                        targetSubcategoryId,
                        vocab);
            } catch (DuplicateDataException ignored) {}
        });
        return targetSubcategory;
    }

    @Override
    @Transactional
    public void deleteVocabulariesOfSubcategory(Long wordListId, Long subcategoryId, List<SubcategoryDetail> vocabularies) {
        Subcategory subcategory = getOwnedSubcategory(wordListId, subcategoryId);
        Map<Long, List<SubcategoryDetail>> vocabDefs = vocabularies.stream()
                .collect(Collectors.groupingBy(SubcategoryDetail::getVocabId
                ));
        vocabDefs.forEach((vocabId, subDetailList) -> {
            Vocabulary vocabulary = vocabularyRepository.findById(vocabId)
                    .orElseThrow(() -> new EntityNotFoundException("Vocabulary not found with ID: " + vocabId));
            if (vocabulary.getStatus() == VocabularyStatus.PENDING) {
                subDetailList.forEach(subDetail -> {
                    VocabDef vocabDef = vocabDefRepository.findById(new VocabDefId(vocabId, subDetail.getDefId()))
                            .orElseThrow(() -> new EntityNotFoundException("Vocabulary not found"));
                    subcategoryDetailRepository.delete(subDetail);
                    vocabDef.setDeleted(true);
                });
                if (vocabDefRepository.isDeletable(vocabId)) {
                    List<Definition> definitions = definitionRepository.findAllByVocabId(vocabId);
                    vocabDefRepository.deleteAll(vocabDefRepository.findAllByVocabId(vocabId));
                    definitionRepository.deleteAll(definitions);
                    vocabularyRepository.delete(vocabulary);
                }
            } else {
                subcategoryDetailRepository.deleteAll(subDetailList);
            }
            subcategory.setAmountOfWord(subcategory.getAmountOfWord() - subDetailList.size());
        });
    }

    @Override
    @Transactional
    public void deleteSubcategories(Long wordlistId, List<Long> subcategoryIds) {
        Map<Subcategory, List<SubcategoryDetail>> subcategoryDetailList = subcategoryIds.stream()
                .map(id -> {
                    Subcategory subcategory = getOwnedSubcategory(wordlistId, id);
                    List<SubcategoryDetail> subcategoryDetails = subcategoryDetailRepository.findAllBySubcategoryId(id);
                    return Map.entry(subcategory, subcategoryDetails);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        subcategoryDetailList.forEach((subcategory, subcategoryDetails) -> {
            deleteVocabulariesOfSubcategory(wordlistId, subcategory.getSubcategoryId(), subcategoryDetails);
            subcategoryRepository.delete(subcategory);
        });
    }

    @Override
    public VocabularyQuestion<?> createGame(GameType gameType, Long subcategoryId, Long wordListId) {
        getOwnedSubcategory(wordListId, subcategoryId);
        List<SubcategoryDetail> subcategoryDetails = new ArrayList<>();
        if (gameType == GameType.REVIEW) {
            // subcategoryDetails = sql query for game type review
        }
        // subcategoryDetails = sql query for others game
        return null;
    }

    @Override
    public Subcategory getOwnedSubcategory(Long wordListId, Long subcategoryId) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        WordList wordList = wordListRepository.findByUserAndWordListId(user, wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        return subcategoryRepository.findBySubcategoryIdAndWordList(subcategoryId, wordList)
                .orElseThrow(() -> new EntityNotFoundException("Subcategory not found with ID:" + subcategoryId));
    }
}
