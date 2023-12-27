package com.pbl6.dictionaryappbe.repository;


import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import com.pbl6.dictionaryappbe.persistence.vocabulary.VocabularyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long>, JpaSpecificationExecutor<Vocabulary> {
    boolean existsByWordAndPos(String word, String pos);

    @Query(value = """
                            SELECT scd.def_id as defId
                            FROM users u
                            JOIN word_list wl on u.user_id = wl.user_id
                            JOIN subcategory sc on wl.word_list_id = sc.word_list_id
                            JOIN subcategory_detail scd on sc.subcategory_id = scd.subcategory_id
                            WHERE u.email = :email AND CONCAT(scd.vocab_id, '-', scd.def_id) in (:vocabDefs) \s
            """, nativeQuery = true)
    List<Long> findVocabWordlistByUserEmailAndVocabIds(
            @Param("email") String email,
            @Param("vocabDefs") List<String> vocabDefs
    );

    @Query(value = """
                            SELECT vl.def_id as defId
                            FROM users u
                            JOIN vocab_leitner vl on u.user_id = vl.user_id
                            WHERE u.email = :email AND CONCAT(vl.vocab_id, '-', vl.def_id) in (:vocabDefs) \s
            """, nativeQuery = true)
    List<Long> findVocabLeitnerByEmailAndVocabIds(
            @Param("email") String email,
            @Param("vocabDefs") List<String> vocabDefs
    );

    @Query(value = "SELECT distinct pos FROM vocabularies", nativeQuery = true)
    List<String> findAllPos();

    List<Vocabulary> findAllByStatus(VocabularyStatus status);
}
