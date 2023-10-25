package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailUserDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.mapper.VocabularyMapper;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.WordType;
import com.pbl6.dictionaryappbe.repository.VocabularyRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabularyMapper vocabularyMapper;

    @Override
    public Page<VocabDetailDto> findByKeyword(String keyword, int offset, int limit) {
        int pageNo = offset / limit;
        Pageable pageable = PageRequest.of(pageNo, limit, Sort.by("word").ascending());
        Page<Vocabulary> vocabularies =
                vocabularyRepository.findByWordStartsWithAndWordType(keyword, WordType.DEFAULT, pageable);
        Page<VocabDetailDto> detailDtoList = vocabularies.map(vocabularyMapper::toVocabDetailDto);

        User user = AuthenticationUtils.getUserFromSecurityContext();
        if (user != null) {
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
        return detailDtoList;
    }
}
