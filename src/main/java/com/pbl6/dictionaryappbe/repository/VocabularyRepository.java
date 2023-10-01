package com.pbl6.dictionaryappbe.repository;


import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
    List<Vocabulary> findByWordStartsWith(String keyword, Pageable pageable);
}
