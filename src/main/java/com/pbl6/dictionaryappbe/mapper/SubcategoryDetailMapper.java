package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularySubcategoryResponseDto;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubcategoryDetailMapper {
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
