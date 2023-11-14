package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.dto.leitner.StatusLevelDto;
import com.pbl6.dictionaryappbe.dto.subcategory.game.GameType;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter  {
    private StringToEnumConverter(){}
    public static class EnumGameTypeConverter implements Converter<String, GameType> {
        @Override
        public GameType convert(String source) {
            return GameType.valueOf(source.toUpperCase());
        }
    }
    public static class EnumStatusLevelConverter implements Converter<String, StatusLevelDto> {
        @Override
        public StatusLevelDto convert(String source) {
            return StatusLevelDto.valueOf(source.toUpperCase());
        }
    }
}