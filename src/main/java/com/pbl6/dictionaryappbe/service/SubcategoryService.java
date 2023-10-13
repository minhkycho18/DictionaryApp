package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;

import java.util.List;

public interface SubcategoryService {

    List<Subcategory> getAllSubcategories(Long id);

    Subcategory createSubcategory(SubcategoryDto subcategory);

    Subcategory updateSubcategory(Long id, SubcategoryDto subcategory);

    void deleteSubcategory(Long id);

    Subcategory getOwnedSubcategory(Long id);
}
