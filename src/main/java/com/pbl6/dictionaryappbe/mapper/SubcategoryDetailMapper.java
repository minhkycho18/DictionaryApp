package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionRequestDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.ContributionResponseDto;
import com.pbl6.dictionaryappbe.dto.vocabulary.SubcategoryDetailResponseDto;
import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubcategoryDetailMapper {
    default ContributionResponseDto toContributionResponseDto(List<SubcategoryDetail> subcategoryDetails) {
        SubcategoryDetail newSubcategoryDetail = subcategoryDetails.get(0);
        Vocabulary vocabulary = newSubcategoryDetail.getVocabDef().getVocabulary();
        List<Definition> definitions = subcategoryDetails.stream()
                .map(subcategoryDetail -> subcategoryDetail.getVocabDef().getDefinition())
                .toList();
        return ContributionResponseDto.builder()
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

    default ContributionRequestDto toContributionRequestDto(Long newSubcategoryId, List<SubcategoryDetail> subcategoryDetails) {
        SubcategoryDetail newSubcategoryDetail = subcategoryDetails.get(0);
        Vocabulary vocabulary = newSubcategoryDetail.getVocabDef().getVocabulary();
        List<DefinitionRequestDto> definitions = subcategoryDetails.stream()
                .map(subcategoryDetail -> new DefinitionRequestDto(subcategoryDetail.getVocabDef().getDefinition().getWordDesc(),
                        subcategoryDetail.getVocabDef().getDefinition().getExamples()))
                .toList();
        return ContributionRequestDto.builder()
                .word(vocabulary.getWord())
                .vocabularyStatus(vocabulary.getStatus())
                .pos(vocabulary.getPos())
                .phoneUk(vocabulary.getPhoneUk())
                .phoneUs(vocabulary.getPhoneUs())
                .audioUk(vocabulary.getAudioUk())
                .audioUs(vocabulary.getAudioUs())
                .definition(definitions)
                .subcategoryId(newSubcategoryId)
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

