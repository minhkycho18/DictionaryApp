package com.pbl6.dictionaryappbe.utils;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;

public class StreamUtils {
    private StreamUtils(){}
    public static <T,R> Predicate<T> distinctBy(Function<T,R> function) {
        Set<R> existedSet = new HashSet<>();
        return t -> existedSet.add(function.apply(t));
    }
}
