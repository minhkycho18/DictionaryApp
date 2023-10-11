package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabDetailDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySearchDto;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VocabularyMapper {
    @Mapping(target = "id", source = "vocabId")
    @Mapping(target = "definitions", source = "vocabDefs", qualifiedByName = "convertVocabDefsToDefStr")
    VocabularySearchDto toVocabSearchDto(Vocabulary vocabulary);

    @Mapping(target = "id", source = "vocabId")
    @Mapping(target = "definitions", source = "vocabDefs", qualifiedByName = "convertVocabDefsToDefDetail")
    VocabDetailDto toVocabDetailDto(Vocabulary vocabulary);

    @Named("convertVocabDefsToDefStr")
    static List<String> convertVocabDefsToDefStr(List<VocabDef> vocabDefs) {
        return vocabDefs.stream()
                .map(vocabDef -> vocabDef.getDefinition().getWordDesc())
                .toList();
    }

    @Named("convertVocabDefsToDefDetail")
    static List<DefinitionDetailDto> convertVocabDefsToDefDetail(List<VocabDef> vocabDefs) {
        return vocabDefs.stream()
                .map(vocabDef -> DefinitionDetailDto.builder()
                        .defId(vocabDef.getDefinition().getDefId())
                        .wordDesc(vocabDef.getDefinition().getWordDesc())
                        .examples(vocabDef.getDefinition().getExamples())
                        .synonyms(vocabDef.getDefinition().getVocabDefs()
                                .stream()
                                .map(vocabDefInner -> vocabDefInner.getVocabulary().getWord())
                                .filter(s -> !s.equals(vocabDef.getVocabulary().getWord()))
                                .toList())
                        .build())
                .toList();
    }
}
