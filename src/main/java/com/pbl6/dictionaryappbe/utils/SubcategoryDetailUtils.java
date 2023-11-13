package com.pbl6.dictionaryappbe.utils;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;

import java.util.List;

public class SubcategoryDetailUtils {
    private SubcategoryDetailUtils() {

    }

    public static List<SubcategoryDetail> filterDeletedVocabulary(List<SubcategoryDetail> subcategoryDetails) {
        return subcategoryDetails.stream().filter(subcategoryDetail -> !subcategoryDetail.getVocabDef().isDeleted()).toList();
    }
}
