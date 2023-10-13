package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.leitner.LeitnerId;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeitnerRepository extends JpaRepository<VocabLeitner, LeitnerId> {
    boolean existsByVocabDef(VocabDef vocabDef);

}
