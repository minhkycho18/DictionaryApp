package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionLeitnerDetailDto;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import org.mapstruct.*;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface LeitnerMapper {
    @Mapping(target = "wordDesc", source = "vocabDef.definition.wordDesc")
    @Mapping(target = "level", source = "levelLeitner.level")
    @Mapping(target = "studyTime", source = ".", qualifiedByName = "setStudyTime")
    DefinitionLeitnerDetailDto vocabLeitnerToDefinition(VocabLeitner leitner);

    @Named("setStudyTime")
    static LocalDateTime addStudyTimeBeforeMapping(VocabLeitner leitner) {
        LocalDateTime lastLearning = leitner.getLastLearning();
        LevelLeitner levelLeitner = leitner.getLevelLeitner();
        if(lastLearning == null) {
            return LocalDateTime.now();
        }
        return lastLearning.plusHours(levelLeitner.getTime());
    }
}
