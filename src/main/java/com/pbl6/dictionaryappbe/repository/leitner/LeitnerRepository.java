package com.pbl6.dictionaryappbe.repository.leitner;

import com.pbl6.dictionaryappbe.dto.leitner.LeitnerVocabCardGame;
import com.pbl6.dictionaryappbe.persistence.leitner.LeitnerId;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeitnerRepository extends JpaRepository<VocabLeitner, LeitnerId>, LeitnerDao {
    @Query(value = """
        SELECT *
        FROM vocab_leitner
        WHERE CONCAT(vocab_id, '-', def_id) IN :vocabDefs AND user_id = :userId
    """, nativeQuery = true)
    List<VocabLeitner> findAllByVocabDefId(@Param("vocabDefs") List<String> vocabDefIds, @Param("userId") Long userId);

    @Query(name = "find_leitner_game", nativeQuery = true)
    List<LeitnerVocabCardGame> findVocabLeitnerGameByLevel(
            @Param("level") Integer level, @Param("userId") Long userId);
}
