package com.pbl6.dictionaryappbe.utils;

import java.util.List;
import java.util.function.Function;

public class MapperUtils {

    private MapperUtils() {

    }

    public static <T,E> List<T> toTargetList(Function<E,T> function, List<E> sources) {
        return sources
                .stream()
                .map(function)
                .toList();
    }
}
