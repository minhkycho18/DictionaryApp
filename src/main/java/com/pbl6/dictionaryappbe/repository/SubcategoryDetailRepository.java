package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryDetailRepository
        extends JpaRepository<SubcategoryDetail, SubcategoryDetailId> {
    List<SubcategoryDetail> findAllBySubcategoryId(Long subcategoryId);

    @Query(value = """
                SELECT COUNT(*)
                FROM subcategory_detail
                WHERE subcategory_id = :subcategoryId AND is_review = true AND :statusField = false
            """, nativeQuery = true)
    int countBySubIdAndStatusField(@Param("subcategoryId") Long subcategoryId,
                                   @Param("statusField") String statusField);

    int countBySubcategoryIdAndAndIsReview(Long subcategoryId, boolean isReview);

    int countBySubcategoryId(Long subcategoryId);

    @Query(value = """
            (
                SELECT *
                FROM subcategory_detail
                WHERE subcategory_id = :subcategoryId AND is_review = true AND :statusField = true
                ORDER BY RAND()
                LIMIT :numberOfLearnedItem
            )
            UNION
            (
                SELECT *
                FROM subcategory_detail
                WHERE subcategory_id = :subcategoryId AND is_review = true AND :statusField = false
                ORDER BY RAND()
                LIMIT :numberOfLearningItem
            );
            """, nativeQuery = true)
    List<SubcategoryDetail> getRandomByGameType(@Param("subcategoryId") Long subcategoryId,
                                                @Param("statusField") String statusField,
                                                @Param("numberOfLearningItem") int numberOfLearningItem,
                                                @Param("numberOfLearnedItem") int numberOfLearnedItem);

    @Query(value = """
            (
                SELECT *
                FROM subcategory_detail
                WHERE subcategory_id = :subcategoryId AND is_review = true
                ORDER BY RAND()
                LIMIT :numberOfLearnedItem
            )
            UNION
            (
                SELECT *
                FROM subcategory_detail
                WHERE subcategory_id = :subcategoryId AND is_review = false
                ORDER BY RAND()
                LIMIT :numberOfLearningItem
            );
            """, nativeQuery = true)
    List<SubcategoryDetail> getRandomByIsReview(@Param("subcategoryId") Long subcategoryId,
                                                @Param("numberOfLearningItem") int numberOfLearningItem,
                                                @Param("numberOfLearnedItem") int numberOfLearnedItem);

    @Query(value = """
            SELECT sd.* FROM subcategory_detail sd
            join vocabularies v
            on sd.vocab_id = v.vocab_id
            where v.status = "DEFAUlT" and sd.subcategory_id = :subcategoryId
            """, nativeQuery = true)
    List<SubcategoryDetail> findAllDefaultVocabBySubcategoryId(@Param("subcategoryId") Long subcategoryId);
}
