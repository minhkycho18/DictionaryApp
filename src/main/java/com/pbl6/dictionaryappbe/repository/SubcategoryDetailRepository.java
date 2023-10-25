package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryDetailRepository extends JpaRepository<SubcategoryDetail, SubcategoryDetailId> {
    List<SubcategoryDetail> findAllBySubcategoryId(Long subcategoryId);

    SubcategoryDetail findByVocabDefAndSubcategoryId(VocabDef vocabDef, Long subcategoryId);
}
