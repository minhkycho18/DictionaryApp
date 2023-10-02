package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.VocabularySearchDto;
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

    @Named("convertVocabDefsToDefStr")
    static List<String> convertVocabDefsToDefStr(List<VocabDef> vocabDefs) {
        return vocabDefs.stream()
                .map(vocabDef -> vocabDef.getDefinition().getWordDesc())
                .toList();
    }
}
