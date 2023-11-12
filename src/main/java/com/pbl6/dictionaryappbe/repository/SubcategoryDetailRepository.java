package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryDetailRepository extends JpaRepository<SubcategoryDetail, SubcategoryDetailId> {
    List<SubcategoryDetail> findAllBySubcategoryId(Long subcategoryId);

    @Query(value = """
            SELECT sd.* FROM subcategory_detail sd
            join vocabularies v
            on sd.vocab_id = v.vocab_id
            where v.status = "DEFAUlT" and sd.subcategory_id = :subcategoryId
            """, nativeQuery = true)
    List<SubcategoryDetail> findAllDefaultVocabBySubcategoryId(@Param("subcategoryId") Long subcategoryId);
}
