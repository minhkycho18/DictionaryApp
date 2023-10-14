package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.subcategory.SubcategoryResponseDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubcategoryMapper {
    @Mapping(source = "wordList.wordListId", target = "wordListId")
    SubcategoryResponseDto toSubcategoryResponseDto(Subcategory subcategory);
}
