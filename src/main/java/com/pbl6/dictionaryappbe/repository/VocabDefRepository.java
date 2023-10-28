package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDefId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabDefRepository extends JpaRepository<VocabDef, VocabDefId> {

}