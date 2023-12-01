package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.subcategory.game.*;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.InvalidRequestDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.SubcategoryDetailMapper;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
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
import com.pbl6.dictionaryappbe.utils.StreamUtils;
import com.pbl6.dictionaryappbe.utils.SubcategoryDetailUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService, SubcategoryGameService {

    private static final int MAXIMUM_NUMBER_OF_QUESTION = 30;
    private static final double PERCENTAGE_OF_LEARNING_QUESTION = 0.8;
    private final SubcategoryRepository subcategoryRepository;
    private final WordListRepository wordListRepository;
    private final SubcategoryMapper subcategoryMapper;
    private final VocabDefRepository vocabDefRepository;
    private final SubcategoryDetailRepository subcategoryDetailRepository;
    private final SubcategoryDetailMapper subcategoryDetailMapper;
    private final VocabularyRepository vocabularyRepository;
    private final DefinitionRepository definitionRepository;
    private final Random rand = new Random();

    @Override
    public List<SubcategoryResponseDto> getAllSubcategories(Long wordListId, String keyword) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        WordList wordList = wordListRepository.findById(wordListId)
                .orElseThrow(() -> new RecordNotFoundException("WordList not found with ID: " + wordListId));
        assert user != null;
        if (wordList.getListType() == ListType.PRIVATE
                && !wordList.getUser().getUserId().equals(user.getUserId())) {
            throw new AccessDeniedException("You do not have permission to access this WordList");
        }
        List<Subcategory> subcategories = subcategoryRepository.findAllByWordList(wordList);
        subcategories = subcategories.stream()
                .filter(subcategory -> subcategory.getTitle().toLowerCase().startsWith(keyword.toLowerCase()))
                .sorted(Comparator.comparing(Subcategory::getTitle, String.CASE_INSENSITIVE_ORDER))
                .toList();
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
    public Page<SubcategoryDetailResponseDto> getAllVocabularies(Long wordListId, Long subcategoryId, int offset, int limit) {
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit);
        Page<SubcategoryDetail> vocabularyPage;

        try {
            getOwnedSubcategory(wordListId, subcategoryId);
            vocabularyPage = subcategoryDetailRepository.findAllBySubcategoryId(subcategoryId, pageable);
        } catch (AccessDeniedException e) {
            vocabularyPage = subcategoryDetailRepository.findAllDefaultVocabBySubcategoryId(subcategoryId, pageable);
        }

        List<SubcategoryDetailResponseDto> vocabularyDtos = MapperUtils.toTargetList(subcategoryDetailMapper::toSubcategoryDetailResponseDto, SubcategoryDetailUtils.filterDeletedVocabulary(vocabularyPage.getContent()));
        return new PageImpl<>(vocabularyDtos, pageable, vocabularyPage.getTotalElements());
    }

    @Override
    @Transactional
    public ContributionResponseDto contributeVocabulary(Long wordListId, ContributionRequestDto contributionVocabulary) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
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
                .status(contributionVocabulary.getIsContribute() ? VocabularyStatus.PENDING : VocabularyStatus.PERSONAL)
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
                    .isSpelling(false)
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
                .isSpelling(false)
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
            } catch (DuplicateDataException ignored) {
            }
        });
        return targetSubcategory;
    }

    @Override
    public SubcategoryResponseDto updateTitleSubcategory(Long wordListId, Long subcategoryId, String newTitle) {
        Subcategory subcategory = getOwnedSubcategory(wordListId, subcategoryId);
        subcategory.setTitle(newTitle);
        subcategoryRepository.save(subcategory);
        return subcategoryMapper.toSubcategoryResponseDto(subcategory);
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
    public Subcategory getOwnedSubcategory(Long wordListId, Long subcategoryId) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        WordList wordList;
        if (user == null) {
            wordList = wordListRepository.findById(wordListId)
                    .orElseThrow(() -> new EntityNotFoundException("WordList not found"));
            if (wordList.getListType() == ListType.PRIVATE) {
                throw new AccessDeniedException("You do not have permission to access this WordList");
            }
        } else {
            wordList = (user.getRole().getName().equals(RoleName.LEARNER))
                    ? wordListRepository.findByUserAndWordListId(user, wordListId)
                    .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"))
                    : wordListRepository.findById(wordListId)
                    .orElseThrow(() -> new EntityNotFoundException("You do not have permission to access this WordList"));
        }

        return subcategoryRepository.findBySubcategoryIdAndWordList(subcategoryId, wordList)
                .orElseThrow(() -> new EntityNotFoundException("Subcategory not found with ID:" + subcategoryId));
    }

    @Override
    public List<SubcategoryDetail> getRandomSubDetailByGameType(GameType gameType, Long subcategoryId, Long wordListId) {
        getOwnedSubcategory(wordListId, subcategoryId);
        Map<GameType, String> gameTypeMap = new EnumMap<>(GameType.class);
        gameTypeMap.put(GameType.FLASHCARD, "is_flashcard");
        gameTypeMap.put(GameType.SPELLING, "is_spelling");
        gameTypeMap.put(GameType.QUIZ, "is_quiz");

        List<SubcategoryDetail> subcategoryDetails;
        NumberOfQuestion numberOfQuestion = handleNumberOfQuestion(gameType, subcategoryId);
        if (gameType == GameType.REVIEW) {
            subcategoryDetails = subcategoryDetailRepository.getRandomByIsReview(subcategoryId,
                    numberOfQuestion.getNumberOfLearningQuestions(),
                    numberOfQuestion.getNumberOfLearnedQuestions());
        } else {
            subcategoryDetails = subcategoryDetailRepository.getRandomByGameType(subcategoryId,
                    gameTypeMap.get(gameType),
                    numberOfQuestion.getNumberOfLearningQuestions(),
                    numberOfQuestion.getNumberOfLearnedQuestions());
        }
        return subcategoryDetails;
    }

    @Override
    public NumberOfQuestion handleNumberOfQuestion(final GameType gameType, final Long subcategoryId) {
        Map<GameType, String> gameTypeMap = new EnumMap<>(GameType.class);
        gameTypeMap.put(GameType.FLASHCARD, "is_flashcard");
        gameTypeMap.put(GameType.SPELLING, "is_spelling");
        gameTypeMap.put(GameType.QUIZ, "is_quiz");

        int numberOfVocabs = gameType == GameType.REVIEW
                ? subcategoryDetailRepository.countBySubcategoryId(subcategoryId)
                : subcategoryDetailRepository.countBySubcategoryIdAndAndIsReview(subcategoryId, true);

        int numberOfQuestion = Math.min(numberOfVocabs, MAXIMUM_NUMBER_OF_QUESTION);
        int numberOfLearningQuestions = gameType == GameType.REVIEW
                ? subcategoryDetailRepository.countBySubcategoryIdAndAndIsReview(subcategoryId, false)
                : subcategoryDetailRepository.countBySubIdAndStatusField(subcategoryId, gameTypeMap.get(gameType));

        int numberOfLearnedQuestions = numberOfVocabs - numberOfLearningQuestions;


        if (numberOfQuestion == MAXIMUM_NUMBER_OF_QUESTION) {
            int minimumNumberOfLearningQuestion = (int) (numberOfQuestion * PERCENTAGE_OF_LEARNING_QUESTION);
            if (numberOfLearningQuestions >= minimumNumberOfLearningQuestion) {
                numberOfLearningQuestions = minimumNumberOfLearningQuestion;
            }
            numberOfLearnedQuestions = numberOfQuestion - numberOfLearningQuestions;
        }
        return new NumberOfQuestion(numberOfLearningQuestions, numberOfLearnedQuestions);
    }

    @Override
    public List<FlashcardQuestionDto> createFlashcardGame(List<SubcategoryDetail> randomSubDetails) {
        Set<String> randomDescription = randomSubDetails.stream()
                .map(subcategoryDetail -> subcategoryDetail.getVocabDef().getDefinition().getWordDesc())
                .collect(Collectors.toSet());

        List<FlashcardQuestionDto> flashcardQuestionDtos =
                MapperUtils.toTargetList(subcategoryDetailMapper::toVocabularyQuestion, randomSubDetails)
                        .stream()
                        .map(FlashcardQuestionDto::new)
                        .toList();

        Iterator<FlashcardQuestionDto> flashCardsIter = flashcardQuestionDtos.iterator();
        Iterator<String> descIter = randomDescription.iterator();

        while (flashCardsIter.hasNext() && descIter.hasNext()) {
            FlashcardQuestionDto currentFlashcard = flashCardsIter.next();
            String currentDesc = descIter.next();
            Definition definition =
                    definitionRepository.findByVocabIdAndDefId(currentFlashcard.getVocabId(), currentFlashcard.getDefId())
                            .orElseThrow(() -> new RecordNotFoundException("Definition not found"));
            if (rand.nextBoolean()) {
                currentFlashcard.setQuestion(currentDesc);
                currentFlashcard.setResult(currentDesc.equals(definition.getWordDesc()));
            } else {
                currentFlashcard.setQuestion(definition.getWordDesc());
                currentFlashcard.setResult(true);
            }
            currentFlashcard.setAnswer(definition.getWordDesc());
        }
        return flashcardQuestionDtos;
    }

    @Override
    public List<QuizQuestionDto> createQuizGame(List<SubcategoryDetail> randomSubDetails, Long subcategoryId) {
        List<VocabDef> existedWords =
                subcategoryDetailRepository.findRandomSubReviewed(subcategoryId, randomSubDetails.size() * 4)
                        .stream()
                        .map(SubcategoryDetail::getVocabDef)
                        .filter(StreamUtils.distinctBy(vocabDef -> vocabDef.getVocabulary().getWord()))
                        .toList();
        if (existedWords.size() < 4) {
            existedWords = vocabDefRepository.findRandomLimit(randomSubDetails.size() * 4);
        }

        final List<VocabDef> finalExistedWord = existedWords;
        return MapperUtils.toTargetList(subcategoryDetailMapper::toVocabularyQuestion, randomSubDetails)
                .stream()
                .map(vocabularyQuestionDto -> {
                    Map<String, Boolean> answers = new HashMap<>();
                    answers.put(vocabularyQuestionDto.getWord(), true);
                    Definition definition =
                            definitionRepository.findByVocabIdAndDefId(vocabularyQuestionDto.getVocabId(), vocabularyQuestionDto.getDefId())
                                    .orElseThrow(() -> new RecordNotFoundException("Definition not found"));
                    while (answers.size() < 4) {
                        int randomIndex = rand.nextInt(finalExistedWord.size());
                        String descOfRandomWord = finalExistedWord.get(randomIndex).getDefinition().getWordDesc();
                        String randomWord = finalExistedWord.get(randomIndex).getVocabulary().getWord();
                        if (definition.getWordDesc().equals(descOfRandomWord)
                                || vocabularyQuestionDto.getWord().equals(randomWord))
                            continue;
                        answers.put(randomWord, false);
                    }
                    return new QuizQuestionDto(vocabularyQuestionDto, definition.getWordDesc(), answers);
                })
                .toList();
    }

    @Override
    public List<ReviewSpellingContentDto> createReviewSpellingGame(List<SubcategoryDetail> randomSubDetails) {
        return MapperUtils.toTargetList(subcategoryDetailMapper::toVocabularyQuestion, randomSubDetails)
                .stream()
                .map(vocabularyQuestionDto -> {
                    Definition definition =
                            definitionRepository.findByVocabIdAndDefId(vocabularyQuestionDto.getVocabId(), vocabularyQuestionDto.getDefId())
                                    .orElseThrow(() -> new RecordNotFoundException("Definition not found"));
                    return new ReviewSpellingContentDto(vocabularyQuestionDto, definition.getWordDesc(), definition.getExamples());
                })
                .toList();
    }

    @Override
    @Transactional
    public void updateStatusGame(Long wordListId, Long subcategoryId, GameType gameType, List<VocabDefId> vocabDefs) {
        getOwnedSubcategory(wordListId, subcategoryId);
        vocabDefs.forEach(vocabDefId -> {
            SubcategoryDetail detail =
                    subcategoryDetailRepository.findBySubcategoryIdAndVocabIdAndDefId(
                                    subcategoryId, vocabDefId.getVocabId(), vocabDefId.getDefId())
                            .orElseThrow(() -> new RecordNotFoundException("Subcategory Detail not found"));
            if (gameType != GameType.REVIEW && !detail.getIsReview()) {
                throw new InvalidRequestDataException("Not enough condition to update status");
            }
            switch (gameType) {
                case REVIEW -> detail.setIsReview(true);
                case FLASHCARD -> detail.setIsFlashcard(true);
                case SPELLING -> detail.setIsSpelling(true);
                default -> detail.setIsQuiz(true);
            }
            detail.setLastLearning(LocalDateTime.now());
            subcategoryDetailRepository.save(detail);
        });
    }
}
