package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface WordListMapper {
    @Mapping(source = "user", target = "createdBy", qualifiedByName = "convertUserToCreatedBy")
    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "convertCreatedAtLDTToCreatedAtLD")
    WordListDto toWordListDto(WordList wordList);

    @Named("convertUserToCreatedBy")
    static String convertUserToCreatedBy(User user) {
        return user.getName();
    }

    @Named("convertCreatedAtLDTToCreatedAtLD")
    static String convertCreatedAtLDTToCreatedAtLD(LocalDateTime createdAt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return createdAt.toLocalDate().format(formatter);
    }
}

