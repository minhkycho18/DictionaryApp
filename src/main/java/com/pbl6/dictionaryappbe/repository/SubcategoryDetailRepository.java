package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetailId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubcategoryDetailRepository
        extends JpaRepository<SubcategoryDetail, SubcategoryDetailId> {
    List<SubcategoryDetail> findAllBySubcategoryId(Long subcategoryId);

    List<SubcategoryDetail> findAllBySubcategoryId(Long subcategoryId, Pageable pageable);

    Optional<SubcategoryDetail> findBySubcategoryIdAndVocabIdAndDefId(Long subcategoryId, Long vocabId, Long defId);

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
            JOIN vocabularies v
            ON sd.vocab_id = v.vocab_id
            WHERE v.status = "DEFAUlT" AND sd.subcategory_id = :subcategoryId
            ORDER BY v.word
            """, nativeQuery = true)
    List<SubcategoryDetail> findAllDefaultVocabBySubcategoryId(@Param("subcategoryId") Long subcategoryId, Pageable pageable);

    @Query(value = """
            SELECT *
            FROM subcategory_detail
            where subcategory_id = :subcategoryId and is_review = true
            ORDER BY rand()
            limit :limit
            """, nativeQuery = true)
    List<SubcategoryDetail> findRandomSubReviewed(@Param("subcategoryId") Long subcategoryId,
                                                  @Param("limit") int limit);
}
