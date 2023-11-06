package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.Definition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefinitionRepository extends JpaRepository<Definition, Long> {
    @Query(value = """
               SELECT d.* FROM definitions d
                   JOIN vocab_def vcd
                   ON d.def_id = vcd.def_id
                   WHERE vcd.vocab_id = :vocabId
            """,
            nativeQuery = true)
    List<Definition> findAllByVocabId(@Param("vocabId") Long vocabId);
}
