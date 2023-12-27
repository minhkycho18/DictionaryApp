package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailUserDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.CreationVocabRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.VocabularyMapper;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import com.pbl6.dictionaryappbe.repository.DefinitionRepository;
import com.pbl6.dictionaryappbe.repository.VocabDefRepository;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabDefRepository vocabDefRepository;
    private final VocabularyMapper vocabularyMapper;
    private final DefinitionRepository definitionRepository;

    @Override
    public List<String> findAllPos() {
        return vocabularyRepository.findAllPos();
    }

    @Override
    public List<VocabDetailDto> getAllContributionVocab() {
        List<Vocabulary> vocabularies = vocabularyRepository.findAllByStatus(VocabularyStatus.PENDING);
        return MapperUtils.toTargetList(vocabularyMapper::toVocabDetailDto, vocabularies);
    }

    @Override
    public Page<VocabDetailDto> findByKeyword(String keyword, String pos, int offset, int limit) {
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit, Sort.by("word").ascending());

        Specification<Vocabulary> filterSpec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!keyword.isEmpty()) {
                String triggerKeyword;
                if (Character.isUpperCase(keyword.charAt(0))) {
                    triggerKeyword = StringUtils.uncapitalize(keyword);
                } else {
                    triggerKeyword = StringUtils.capitalize(keyword);
                }
                predicates.add(
                        cb.or(
                                cb.like(root.get("word"), keyword + "%"),
                                cb.like(root.get("word"), triggerKeyword + "%")
                        ));
            }
            if (pos != null) {
                predicates.add(cb.equal(root.get("pos"), pos.toLowerCase()));
            }
            predicates.add(cb.equal(root.get("status"), VocabularyStatus.DEFAULT));
            Join<Vocabulary, VocabDef> vocabDefs = root.join("vocabDefs");
//             Don't select vocabulary if all definitions of the word have been deleted.
            predicates.add(cb.equal(vocabDefs.get("isDeleted"), false));
            query.groupBy(root.get("vocabId")).where(cb.and(predicates.toArray(new Predicate[0])));
            return query.getRestriction();
        };

        Page<Vocabulary> vocabularies = vocabularyRepository.findAll(filterSpec, pageable);
        Page<VocabDetailDto> detailDtoList = vocabularies.map(vocabularyMapper::toVocabDetailDto);

        User user = AuthenticationUtils.getUserFromSecurityContext();
        if (user != null) {
            setInfoVocabOfUser(detailDtoList, vocabularies, user);
        }
        return detailDtoList;
    }

    @Override
    public void setInfoVocabOfUser(
            Page<VocabDetailDto> detailDtoList, Page<Vocabulary> vocabularies, User user
    ) {
        // Get all defId in detailDtoList
        List<String> defIds = vocabularies.stream()
                .flatMap(vocabulary -> vocabulary.getVocabDefs().stream())
                .map(vocabDef -> vocabDef.getVocabId().toString() + "-" + vocabDef.getDefId().toString())
                .toList();
        // Get all vocab in user's word list by list defIds
        List<Long> userWordlistDefIds =
                vocabularyRepository.findVocabWordlistByUserEmailAndVocabIds(user.getEmail(), defIds);
        // Get all vocab in user's leitner by list defIds
        List<Long> userLeitnerDefIds =
                vocabularyRepository.findVocabLeitnerByEmailAndVocabIds(user.getEmail(), defIds);

        // Convert DefinitionDetailDto to DefinitionDetailUserDto
        detailDtoList.forEach(vocabDetailDto ->
                vocabDetailDto.setDefinitions(vocabDetailDto.getDefinitions().stream()
                        .map(definitionDetailDto ->
                                new DefinitionDetailUserDto(
                                        definitionDetailDto,
                                        userWordlistDefIds.contains(definitionDetailDto.getDefId()),
                                        userLeitnerDefIds.contains(definitionDetailDto.getDefId())
                                )
                        )
                        .toList())
        );
    }

    @Override
    @Transactional
    public void updateDefaultVocab(Long vocabId, UpdateDefaultVocabRequest updateDefaultVocabRequest) {
        Vocabulary vocabulary = vocabularyRepository.findById(vocabId)
                .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
        // case delete def
        List<String> currentVocabDefs = updateDefaultVocabRequest.getDefinitions().stream()
                .filter(definitionShortDetail -> definitionShortDetail.getDefId() != null)
                .map(vocabDef -> vocabId + "-" + vocabDef.getDefId())
                .toList();
        vocabDefRepository.updateStatusVocabs(currentVocabDefs, vocabId, true);

        vocabulary.setAudioUs(updateDefaultVocabRequest.getAudioUs());
        vocabulary.setAudioUk(updateDefaultVocabRequest.getAudioUk());
        vocabulary.setPhoneUs(updateDefaultVocabRequest.getPhoneUs());
        vocabulary.setPhoneUk(updateDefaultVocabRequest.getPhoneUk());
        vocabulary.setStatus(updateDefaultVocabRequest.getStatus());
        updateDefaultVocabRequest.getDefinitions().forEach(definitionShortDetail -> {
            if (definitionShortDetail.getDefId() != null) {
                // Case update existed def
                Definition definition =
                        definitionRepository.findByVocabIdAndDefId(vocabId, definitionShortDetail.getDefId())
                                .orElseThrow(() -> new RecordNotFoundException("Definition of vocabulary not found"));
                definition.setWordDesc(definitionShortDetail.getWordDesc());
                definition.setExamples(definitionShortDetail.getExamples());
            } else {
                // Case create new def
                Definition definition = Definition.builder()
                        .wordDesc(definitionShortDetail.getWordDesc())
                        .examples(definitionShortDetail.getExamples())
                        .vocabDefs(new ArrayList<>())
                        .build();
                Definition savedDef = definitionRepository.save(definition);
                VocabDef vocabDef = VocabDef.builder()
                        .defId(savedDef.getDefId())
                        .vocabId(vocabId)
                        .definition(savedDef)
                        .vocabulary(vocabulary)
                        .build();
                vocabDefRepository.save(vocabDef);
            }
        });
    }


    @Override
    public void deleteDefaultVocab(Long vocabId) {
        Vocabulary vocabulary = vocabularyRepository.findById(vocabId)
                .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
        List<Definition> definitions =
                definitionRepository.findAllByVocabId(vocabId)
                        .stream()
                        .filter(definition -> definition.getVocabDefs().size() == 1)
                        .toList();
        vocabDefRepository.deleteAll(vocabulary.getVocabDefs());
        definitionRepository.deleteAll(definitions);
        vocabularyRepository.delete(vocabulary);
    }

    @Override
    public void createDefaultVocab(CreationVocabRequestDto vocabRequestDto) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        boolean isExistedWord =
                vocabularyRepository.existsByWordAndPos(vocabRequestDto.getWord(), vocabRequestDto.getPos().toLowerCase());
        if (isExistedWord)
            throw new DuplicateDataException("This vocabulary is existed");
        Vocabulary vocabulary = Vocabulary.builder()
                .word(vocabRequestDto.getWord())
                .pos(vocabRequestDto.getPos())
                .audioUk(vocabRequestDto.getAudioUk())
                .audioUs(vocabRequestDto.getAudioUs())
                .phoneUk(vocabRequestDto.getPhoneUk())
                .phoneUs(vocabRequestDto.getPhoneUs())
                .status(VocabularyStatus.DEFAULT)
                .contributedAt(LocalDateTime.now())
                .contributedBy(user.getEmail())
                .build();
        List<Definition> definitions = vocabRequestDto.getDefinitions().stream()
                .map(definitionRequestDto -> Definition.builder()
                        .wordDesc(definitionRequestDto.getWordDesc())
                        .examples(definitionRequestDto.getExample())
                        .build())
                .toList();
        final Vocabulary savedVocab = vocabularyRepository.save(vocabulary);
        final List<Definition> savedDefinitions = definitionRepository.saveAll(definitions);
        List<VocabDef> vocabDefs = savedDefinitions.stream()
                .map(definition -> VocabDef.builder()
                        .vocabId(savedVocab.getVocabId())
                        .defId(definition.getDefId())
                        .isDeleted(false)
                        .build())
                .toList();
        vocabDefRepository.saveAll(vocabDefs);
    }
}
