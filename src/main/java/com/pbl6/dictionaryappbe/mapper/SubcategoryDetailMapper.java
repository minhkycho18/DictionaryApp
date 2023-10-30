package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.vocabulary.CustomVocabularyResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubcategoryDetailMapper {
    default CustomVocabularyResponseDto toCustomVocabularyResponseDto(List<SubcategoryDetail> subcategoryDetails) {
        SubcategoryDetail newSubcategoryDetail = subcategoryDetails.get(0);
        Vocabulary vocabulary = newSubcategoryDetail.getVocabDef().getVocabulary();
        List<Definition> definitions = subcategoryDetails.stream()
                .map(subcategoryDetail -> subcategoryDetail.getVocabDef().getDefinition())
                .toList();
        return CustomVocabularyResponseDto.builder()
                .vocabId(newSubcategoryDetail.getVocabId())
                .word(vocabulary.getWord())
                .pos(vocabulary.getPos())
                .phoneUk(vocabulary.getPhoneUk())
                .phoneUs(vocabulary.getPhoneUs())
                .audioUk(vocabulary.getAudioUk())
                .audioUs(vocabulary.getAudioUs())
                .isReview(newSubcategoryDetail.getIsReview())
                .isFlashcard(newSubcategoryDetail.getIsFlashcard())
                .isQuiz(newSubcategoryDetail.getIsQuiz())
                .definitions(definitions)
                .lastLearning(newSubcategoryDetail.getLastLearning())
                .build();
    }

    @Mapping(source = "vocabDef.vocabulary.word", target = "word")
    @Mapping(source = "vocabDef.vocabulary.pos", target = "pos")
    @Mapping(source = "vocabDef.vocabulary.phoneUs", target = "phoneUs")
    @Mapping(source = "vocabDef.vocabulary.phoneUk", target = "phoneUk")
    @Mapping(source = "vocabDef.vocabulary.audioUs", target = "audioUs")
    @Mapping(source = "vocabDef.vocabulary.audioUk", target = "audioUk")
    @Mapping(source = "vocabDef.definition.wordDesc", target = "definition.wordDesc")
    @Mapping(source = "vocabDef.definition.examples", target = "definition.examples")
    SubcategoryDetailResponseDto toSubcategoryDetailResponseDto(SubcategoryDetail subcategoryDetail);
}

