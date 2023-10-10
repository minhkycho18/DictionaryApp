package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubcategoryMapper {

    SubcategoryDto toSubcategoryDto(Subcategory subcategory);


}
