package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VocabDefRepository extends JpaRepository<VocabDef, VocabDefId> {
    @Query("""
            SELECT CASE
                WHEN COUNT(*) = SUM(CASE WHEN v.isDeleted = true THEN 1 ELSE 0 END)
                THEN true ELSE false
                END
            FROM VocabDef v WHERE v.vocabId = :vocabId
            """)
    boolean isDeletable(@Param("vocabId") Long vocabId);

    List<VocabDef> findAllByVocabId(Long vocabId);
}