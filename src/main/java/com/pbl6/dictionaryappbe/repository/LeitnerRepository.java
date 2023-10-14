package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.leitner.LeitnerId;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeitnerRepository extends JpaRepository<VocabLeitner, LeitnerId> {
    List<VocabLeitner> findByLevelLeitner_LevelAndUserId(Integer level, Long userId);
    boolean existsByVocabDef(VocabDef vocabDef);

}
