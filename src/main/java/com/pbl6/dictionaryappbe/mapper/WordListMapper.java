package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WordListMapper {
    @Mapping(source = "wordListId", target = "id")
    @Mapping(source = "user.name", target = "createdBy")
    WordListDto toWordListDto(WordList wordList);

}

