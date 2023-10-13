package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Long> {

    WordList findByTitleAndUser(String title, User user);

    @Query(value = "SELECT wl.* FROM word_list wl " +
            "JOIN users u ON wl.user_id = u.user_id " +
            "WHERE wl.list_type = :listType AND u.user_id != :userId AND u.role_id = :roleId", nativeQuery = true)
    List<WordList> findDefaultWordList(@Param("listType") String listType,
                                       @Param("userId") Long userId,
                                       @Param("roleId") Long roleId);

    List<WordList> findAllByUserRole(Role role);

    List<WordList> findByUser(User user);

    Optional<WordList> findByUserAndWordListId(User user, Long wordListId);
}
