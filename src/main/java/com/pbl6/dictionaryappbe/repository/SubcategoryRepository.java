package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {

    Subcategory findByTitleAndWordList(String title, WordList wordList);

    Optional<Subcategory> findBySubcategoryIdAndWordList(Long subcategoryId, WordList wordList);

    List<Subcategory> findAllByWordList(WordList wordList);
}
