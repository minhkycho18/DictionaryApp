package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.FieldNotNullException;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WordListServiceImpl implements WordListService {

    private final WordListRepository wordListRepository;

    private final RoleRepository roleRepository;

    @Override
    public List<WordList> getAllByUser() {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        return wordListRepository.findByUser(user);
    }

    @Override
    public List<WordList> getAllSystemWordList(RoleName role) {
        return wordListRepository.findAllByUserRole(roleRepository.findByName(RoleName.CONTENT_MANAGER));
    }

    @Override
    public List<WordList> getAllPublicWordList() {
        Long userId = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext()).getUserId();
        Long roleId = roleRepository.findByName(RoleName.LEARNER).getRoleId();
        return wordListRepository.findDefaultWordList(String.valueOf(ListType.PUBLIC), userId, roleId);
    }

    @Override
    @Transactional
    public WordList createWordList(WordListDto wordList) {
        String title = wordList.getTitle();
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (wordListRepository.findByTitle(wordList.getTitle()) != null) {
            throw new DuplicateDataException("Title is existed");
        }
        WordList newWordList = WordList.builder()
                .title(title)
                .listDesc(wordList.getListDesc())
                .createdAt(LocalDateTime.now())
                .subcategories(new ArrayList<>())
                .user(user)
                .build();
        if (user.getRole().getName() == RoleName.CONTENT_MANAGER) {
            newWordList.setListType(ListType.PUBLIC);
        } else {
            String listType = wordList.getListType();
            if (listType == null || listType.isEmpty()) {
                throw new FieldNotNullException("Type of wordlist");
            }
            newWordList.setListType(ListType.valueOf(listType.toUpperCase()));
        }
        return wordListRepository.save(newWordList);
    }

    @Override
    @Transactional
    public WordList updateWordList(Long wordListId, WordListDto wordList) {
        if (wordListRepository.findByTitle(wordList.getTitle()) != null) {
            throw new DuplicateDataException("Title is existed");
        }
        Optional<WordList> oldWordListOptional = wordListRepository.findById(wordListId);
        if (oldWordListOptional.isPresent()) {
            WordList oldWordList = oldWordListOptional.get();
            oldWordList.setTitle(wordList.getTitle());
            oldWordList.setListDesc(wordList.getListDesc());
            oldWordList.setListType(ListType.valueOf(wordList.getListType().toUpperCase()));
            return wordListRepository.save(oldWordList);
        } else {
            throw new EntityNotFoundException("WordList not found with ID: " + wordListId);
        }
    }

    @Override
    @Transactional
    public void deleteWordList(Long id) {
        WordList wordList = wordListRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("WordList not found with ID: " + id));
        wordListRepository.delete(wordList);
    }
}