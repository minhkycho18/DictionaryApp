package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailUserDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.UpdateDefaultVocabRequest;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.VocabularyMapper;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import com.pbl6.dictionaryappbe.repository.DefinitionRepository;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabularyMapper vocabularyMapper;
    private final DefinitionRepository definitionRepository;

    @Override
    public List<String> findAllPos() {
        return vocabularyRepository.findAllPos();
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
            predicates.add(cb.equal(root.get("wordType"), VocabularyStatus.DEFAULT));
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
    public VocabDetailDto updateDefaultVocab(Long vocabId, UpdateDefaultVocabRequest updateDefaultVocabRequest) {
        Vocabulary vocabulary = vocabularyRepository.findById(vocabId)
                .orElseThrow(() -> new RecordNotFoundException("Vocabulary not found"));
        vocabulary.setAudioUs(updateDefaultVocabRequest.getAudioUs());
        vocabulary.setAudioUk(updateDefaultVocabRequest.getAudioUk());
        vocabulary.setPhoneUs(updateDefaultVocabRequest.getAudioUs());
        vocabulary.setPhoneUk(updateDefaultVocabRequest.getPhoneUk());
        updateDefaultVocabRequest.getDefinitions().forEach(definitionShortDetail -> {
            Definition definition =
                    definitionRepository.findByVocabIdAndDefId(
                                    vocabId, definitionShortDetail.getDefId()
                            )
                            .orElseThrow(() -> new RecordNotFoundException("Definition of vocabulary not found"));
            definition.setWordDesc(definitionShortDetail.getWordDesc());
            definition.setExamples(definitionShortDetail.getExamples());
        });
        return vocabularyMapper.toVocabDetailDto(vocabularyRepository.save(vocabulary));
    }
}
