package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;

public class StreamUtils {
    private StreamUtils() {
    }

    public static <T, R> Predicate<T> distinctBy(Function<T, R> function) {
        Set<R> existedSet = new HashSet<>();
        return t -> existedSet.add(function.apply(t));
    }

    public static boolean findVocabDefExisted(VocabDef vocabDef, List<VocabLeitner> vocabLeitners) {
        return vocabLeitners
                .stream().anyMatch(vocabLeitner ->
                        Objects.equals(vocabLeitner.getVocabId(), vocabDef.getVocabId())
                        && Objects.equals(vocabLeitner.getDefId(), vocabDef.getDefId()));
    }
}
