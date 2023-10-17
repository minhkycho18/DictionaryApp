package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.FieldNotNullException;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WordListServiceImpl implements WordListService {

    private final WordListRepository wordListRepository;
    private final RoleRepository roleRepository;
    private final WordListMapper wordListMapper;

    @Override
    public WordListDto getWordListById(Long wordListId) {
        return wordListMapper.toWordListDto(getOwnedWordList(wordListId));
    }

    @Override
    public List<WordListDto> getAllByUser() {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordListRepository.findByUser(user));
    }

    @Override
    public List<WordListDto> getAllSystemWordList(RoleName role) {
        List<WordList> wordLists = wordListRepository.findAllByUserRole(roleRepository.findByName(RoleName.CONTENT_MANAGER));
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordLists);
    }

    @Override
    public List<WordListDto> getAllPublicWordList() {
        Long userId = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext()).getUserId();
        Long roleId = roleRepository.findByName(RoleName.LEARNER).getRoleId();
        List<WordList> wordLists = wordListRepository.findDefaultWordList(String.valueOf(ListType.PUBLIC), userId, roleId);
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordLists);
    }

    @Override
    @Transactional
    public WordListDto createWordList(WordListDto wordList) {
        String title = wordList.getTitle();
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (wordListRepository.findByTitleAndUser(wordList.getTitle(), user) != null) {
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
        return wordListMapper.toWordListDto(wordListRepository.save(newWordList));
    }

    @Override
    @Transactional
    public WordListDto updateWordList(Long wordListId, WordListDto wordList) {
        String newTitle = wordList.getTitle();
        WordList ownedWordList = getOwnedWordList(wordListId);
        if (wordListRepository.findByTitleAndUser(newTitle, ownedWordList.getUser()) != null && !Objects.equals(newTitle, ownedWordList.getTitle())) {
            throw new DuplicateDataException("Title is existed");
        }
        ownedWordList.setTitle(wordList.getTitle());
        ownedWordList.setListDesc(wordList.getListDesc());
        ownedWordList.setListType(ListType.valueOf(wordList.getListType().toUpperCase()));
        return wordListMapper.toWordListDto(wordListRepository.save(ownedWordList));
    }

    @Override
    @Transactional
    public void deleteWordList(Long id) {
        wordListRepository.delete(getOwnedWordList(id));
    }

    @Override
    public WordList getOwnedWordList(Long id) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        return wordListRepository.findByUserAndWordListId(user, id)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
    }
}