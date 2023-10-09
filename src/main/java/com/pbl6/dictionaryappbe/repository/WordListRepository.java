package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Long> {

    WordList findByTitle(String title);

    List<WordList> findByListType(ListType listType);

    List<WordList> findAllByUserRole(Role role);

    @Query(value = "SELECT * FROM word_list WHERE user_id = ?1", nativeQuery = true)
    List<WordList> findWordListsByUserId(Long userId);
}
