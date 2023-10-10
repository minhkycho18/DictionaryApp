package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;

public interface SubcategoryService {

    Subcategory createSubcategory(SubcategoryDto subcategory);
}
