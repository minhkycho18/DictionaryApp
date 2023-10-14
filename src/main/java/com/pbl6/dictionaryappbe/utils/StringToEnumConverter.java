package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.dto.leitner.StatusLevelDto;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, StatusLevelDto> {
    @Override
    public StatusLevelDto convert(String source) {
        return StatusLevelDto.valueOf(source.toUpperCase());
    }
}