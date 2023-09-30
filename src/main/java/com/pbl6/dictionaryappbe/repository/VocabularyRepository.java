package com.pbl6.dictionaryappbe.repository;


import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
}
