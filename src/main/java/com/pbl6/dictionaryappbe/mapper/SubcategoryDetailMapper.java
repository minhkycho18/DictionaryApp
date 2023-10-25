package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionDetailDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryResponseDto;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubcategoryDetailMapper {

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

    @Mapping(source = "vocabDef.vocabulary.word", target = "word")
    @Mapping(source = "vocabDef.vocabulary.pos", target = "pos")
    @Mapping(source = "vocabDef.vocabulary.phoneUs", target = "phoneUs")
    @Mapping(source = "vocabDef.vocabulary.phoneUk", target = "phoneUk")
    @Mapping(source = "vocabDef.vocabulary.audioUs", target = "audioUs")
    @Mapping(source = "vocabDef.vocabulary.audioUk", target = "audioUk")
    @Mapping(source = "vocabDef.definition.wordDesc", target = "definition.wordDesc")
    @Mapping(source = "vocabDef.definition.examples", target = "definition.examples")
    VocabularySubcategoryResponseDto toSubcategoryDetailResponseDto(SubcategoryDetail subcategoryDetail);
}
