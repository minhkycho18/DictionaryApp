package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionLeitnerDetailDto;
import com.pbl6.dictionaryappbe.dto.leitner.LeitnerBoxDto;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface LeitnerMapper {
    @Mapping(target = "wordDesc", source = "vocabDef.definition.wordDesc")
    @Mapping(target = "level", source = "levelLeitner.level")
    @Mapping(target = "studyTime", source = ".", qualifiedByName = "setStudyTime")
    DefinitionLeitnerDetailDto vocabLeitnerToDefinition(VocabLeitner leitner);

    @Mapping(target = "levelName", source = "name")
    @Mapping(target = "amountOfWord", expression = "java(levelLeitner.getVocabLeitners().size())")
    @Mapping(target = "needStudy", source = ".", qualifiedByName = "findWordStudy")
    LeitnerBoxDto levelLeitnerToLeitnerBoxDto(LevelLeitner levelLeitner);

    @Named("setStudyTime")
    static LocalDateTime addStudyTimeBeforeMapping(VocabLeitner leitner) {
        LocalDateTime lastLearning = leitner.getLastLearning();
        LevelLeitner levelLeitner = leitner.getLevelLeitner();
        if (lastLearning == null) {
            return LocalDateTime.now();
        }
        return lastLearning.plusHours(levelLeitner.getTime());
    }

    @Named("findWordStudy")
    static Boolean findWordStudy(LevelLeitner levelLeitner) {
        return levelLeitner.getVocabLeitners().stream()
                .anyMatch(vocabLeitner -> {
                    if (vocabLeitner.getLastLearning() == null) return true;
                    LocalDateTime studyTime = vocabLeitner.getLastLearning().plusHours(levelLeitner.getTime());
                    return studyTime.isBefore(LocalDateTime.now());
                });
    }
}
