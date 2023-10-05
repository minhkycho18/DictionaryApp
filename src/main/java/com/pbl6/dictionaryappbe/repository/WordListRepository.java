package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.WordList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Long> {
}
