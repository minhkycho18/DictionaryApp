package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.leitner.LeitnerBoxDto;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface LeitnerMapper {
    @Mapping(target = "levelName", source = "name")
    @Mapping(target = "amountOfWord", expression = "java(levelLeitner.getVocabLeitners().size())")
    @Mapping(target = "needStudy", source = ".", qualifiedByName = "findWordStudy")
    LeitnerBoxDto levelLeitnerToLeitnerBoxDto(LevelLeitner levelLeitner);

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
