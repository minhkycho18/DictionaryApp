package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryResponseDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.SubcategoryDetailMapper;
import com.pbl6.dictionaryappbe.mapper.SubcategoryMapper;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory.SubcategoryType;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.WordType;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.*;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
        if (wordList.getListType() == ListType.PRIVATE
                && !wordList.getUser().equals(user)) {
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
    public List<VocabularySubcategoryResponseDto> getAllVocabularies(Long subcategoryId) {
        List<SubcategoryDetail> vocabularies = subcategoryDetailRepository.findAllBySubcategoryId(subcategoryId);
        return MapperUtils.toTargetList(subcategoryDetailMapper::toSubcategoryDetailResponseDto, vocabularies);
    }

    @Override
    @Transactional
    public VocabDefId createCustomVocabulary(Long wordListId, CustomVocabularyRequestDto newCustomVocab) {
        Subcategory subcategory = getOwnedSubcategory(wordListId, newCustomVocab.getSubcategoryId());
        Vocabulary newVocab = vocabularyRepository.save(Vocabulary.builder()
                .word(newCustomVocab.getWord())
                .pos(newCustomVocab.getPos())
                .phoneUk(newCustomVocab.getPhoneUk())
                .phoneUs(newCustomVocab.getPhoneUs())
                .audioUs(newCustomVocab.getAudioUs())
                .audioUk(newCustomVocab.getAudioUk())
                .modifiedAt(null)
                .modifiedBy(null)
                .wordType(WordType.CUSTOM)
                .build());
        Definition newDef = definitionRepository.save(Definition.builder()
                .wordDesc(newCustomVocab.getDefinition())
                .examples(newCustomVocab.getExample())
                .build());
        VocabDef newVocabDef = vocabDefRepository.save(VocabDef.builder()
                .vocabId(newVocab.getVocabId())
                .defId(newDef.getDefId())
                .build());
        subcategoryDetailRepository.save(SubcategoryDetail.builder()
                .vocabId(newVocab.getVocabId())
                .defId(newDef.getDefId())
                .subcategoryId(subcategory.getSubcategoryId())
                .isQuiz(false)
                .isReview(false)
                .isFlashcard(false)
                .lastLearning(null)
                .build());
        return new VocabDefId(newVocabDef.getVocabId(), newVocabDef.getDefId());
    }

    @Override
    @Transactional
    public void addVocabToSubcategory(Long wordlistId, Long subcategoryId,
                                      VocabularySubcategoryRequestDto vocabularySubcategoryRequestDto) {
        Subcategory subcategory = getOwnedSubcategory(wordlistId, subcategoryId);
        VocabDef vocabDef = vocabDefRepository.findById(new VocabDefId(vocabularySubcategoryRequestDto.getVocabId(),
                        vocabularySubcategoryRequestDto.getDefId()))
                .orElseThrow(() -> new RecordNotFoundException("Invalid vocabulary"));
        if (subcategoryDetailRepository.findById(
                new SubcategoryDetailId(vocabDef.getVocabId(),
                        vocabDef.getDefId(),
                        subcategoryId)).isPresent()) {
            throw new DuplicateDataException("This vocabulary is existed");
        }
        if (vocabDef.getVocabulary().getWordType() == WordType.CUSTOM
                && subcategory.getSubcategoryType() == SubcategoryType.DEFAULT) {
            throw new IllegalArgumentException("CUSTOM vocabulary can not add to DEFAULT subcategory");
        }
        subcategoryDetailRepository.save(SubcategoryDetail.builder()
                .vocabId(vocabDef.getVocabId())
                .defId(vocabDef.getDefId())
                .subcategoryId(subcategory.getSubcategoryId())
                .isReview(false)
                .isFlashcard(false)
                .isQuiz(false)
                .lastLearning(null)
                .build());
    }

    @Override
    @Transactional
    public SubcategoryResponseDto createSubcategory(Long wordListId, SubcategoryRequestDto subcategory) {
        String title = subcategory.getTitle();
        WordList wordList = wordListRepository.findByUserAndWordListId(AuthenticationUtils.getUserFromSecurityContext(), wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        if (subcategoryRepository.findByTitleAndWordList(title, wordList) != null) {
            throw new DuplicateDataException("Title's subcategory is existed");
        }
        Subcategory newSubcategory = Subcategory.builder()
                .title(title)
                .amountOfWord(0)
                .subcategoryType(SubcategoryType.valueOf(subcategory.getSubcategoryType().toUpperCase()))
                .wordList(wordList)
                .subcategoryDetails(new ArrayList<>())
                .build();
        return subcategoryMapper.toSubcategoryResponseDto(subcategoryRepository.save(newSubcategory));
    }

    @Override
    @Transactional
    public SubcategoryResponseDto updateSubcategory(Long wordlistId, Long subcategoryId, SubcategoryRequestDto subcategory) {
        String title = subcategory.getTitle();
        Subcategory oldSubcategory = getOwnedSubcategory(wordlistId, subcategoryId);
        if (subcategoryRepository.findByTitleAndWordList(title, oldSubcategory.getWordList()) != null
                && !title.equals(oldSubcategory.getTitle())) {
            throw new DuplicateDataException("Duplicate title's subcategory");
        }
        oldSubcategory.setTitle(title);
        return subcategoryMapper.toSubcategoryResponseDto(subcategoryRepository.save(oldSubcategory));
    }

    @Override
    @Transactional
    public void deleteVocabulariesOfSubcategory(Long wordListId, Long subcategoryId, List<SubcategoryDetail> vocabularies) {
        vocabularies.forEach(subDetail -> {
            subcategoryDetailRepository.delete(subDetail);

            Long vocabId = subDetail.getVocabId();
            Vocabulary vocabulary = vocabularyRepository.findById(vocabId)
                    .orElseThrow(() -> new EntityNotFoundException("Vocabulary not found with ID: " + vocabId));

            if (vocabulary.getWordType() == WordType.CUSTOM) {
                Long defId = subDetail.getDefId();
                Definition definition = definitionRepository.findById(defId)
                        .orElseThrow(() -> new EntityNotFoundException("Definition not found with ID: " + defId));

                VocabDef vocabDef = vocabDefRepository.findById(new VocabDefId(vocabId, defId))
                        .orElseThrow(() -> new EntityNotFoundException("Vocabulary not found"));

                vocabDefRepository.delete(vocabDef);
                vocabularyRepository.delete(vocabulary);
                definitionRepository.delete(definition);
            }
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
        WordList wordList = wordListRepository.findByUserAndWordListId(user, wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        return subcategoryRepository.findBySubcategoryIdAndWordList(subcategoryId, wordList)
                .orElseThrow(() -> new EntityNotFoundException("Subcategory not found with ID:" + subcategoryId));
    }

}
