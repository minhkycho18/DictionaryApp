package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.role.Role;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordListRepository extends JpaRepository<WordList, Long> {

    WordList findByTitle(String title);

    List<WordList> findByListType(ListType listType);

    List<WordList> findByListTypeAndUserUserIdNotAndUserRoleRoleId(ListType listType, Long userId, Long roleId);

    List<WordList> findAllByUserRole(Role role);

    List<WordList> findByUser(User user);
}
