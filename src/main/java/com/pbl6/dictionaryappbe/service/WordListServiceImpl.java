package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.wordlist.WordListRequestDto;
import com.pbl6.dictionaryappbe.dto.wordlist.WordListResponseDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.exception.FieldNotNullException;
import com.pbl6.dictionaryappbe.exception.RecordNotFoundException;
import com.pbl6.dictionaryappbe.mapper.WordListMapper;
import com.pbl6.dictionaryappbe.persistence.role.RoleName;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.ListType;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.RoleRepository;
import com.pbl6.dictionaryappbe.repository.SubcategoryRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import com.pbl6.dictionaryappbe.utils.MapperUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class WordListServiceImpl implements WordListService {

    private final WordListRepository wordListRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final RoleRepository roleRepository;
    private final WordListMapper wordListMapper;
    private final SubcategoryService subcategoryService;

    @Override
    public WordListResponseDto getWordListById(Long wordListId) {
        WordList wordList = wordListRepository.findById(wordListId)
                .orElseThrow(() -> new RecordNotFoundException("WordList not found with ID: " + wordListId));
        if (wordList.getListType() == ListType.PRIVATE) {
            return wordListMapper.toWordListDto(getOwnedWordList(wordListId));
        }
        return wordListMapper.toWordListDto(wordList);
    }

    @Override
    public List<WordListResponseDto> getAllByUser() {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        List<WordList> wordLists = wordListRepository.findByUser(user);
        wordLists.sort(Comparator.comparing(WordList::getTitle));
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordLists);
    }

    @Override
    public List<WordListResponseDto> getAllSystemWordList(String keyword) {
        List<Long> targetRoles = Arrays.asList(roleRepository.findByName(RoleName.ADMIN).getRoleId(), roleRepository.findByName(RoleName.CONTENT_MANAGER).getRoleId());
        List<WordList> wordLists = wordListRepository.findAllByUserRoles(targetRoles);
        wordLists = wordLists.stream()
                .filter(wordList -> wordList.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                .sorted(Comparator.comparing(WordList::getTitle, String.CASE_INSENSITIVE_ORDER))
                .toList();
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordLists);
    }

    @Override
    public List<WordListResponseDto> getAllPublicWordList() {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        Long userId = user == null ? null : user.getUserId();
        Long roleId = roleRepository.findByName(RoleName.LEARNER).getRoleId();
        List<WordList> wordLists = wordListRepository.findDefaultWordList(String.valueOf(ListType.PUBLIC), userId, roleId.toString());
        return MapperUtils.toTargetList(wordListMapper::toWordListDto, wordLists);
    }

    @Override
    @Transactional
    public WordListResponseDto createWordList(WordListRequestDto wordList) {
        String title = wordList.getTitle();
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        if (wordListRepository.findByTitleAndUser(title, user) != null) {
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
            if (listType.isEmpty()) {
                throw new FieldNotNullException("Type of wordlist");
            }
            newWordList.setListType(ListType.valueOf(listType.toUpperCase()));
        }
        return wordListMapper.toWordListDto(wordListRepository.save(newWordList));
    }

    @Override
    @Transactional
    public WordListResponseDto cloneWordList(Long wordListId) {
        WordList sourceWordList = wordListRepository.findById(wordListId).orElseThrow(
                () -> new RecordNotFoundException("WordList not found with ID: " + wordListId)
        );
        User user = AuthenticationUtils.getUserFromSecurityContext();
        if (sourceWordList.getListType() == ListType.PRIVATE
                && !sourceWordList.getUser().equals(user)) {
            throw new AccessDeniedException("You do not have permission to access this WordList");
        }
        String title = generateUniqueTitle(sourceWordList.getTitle());
        WordList targetWordList = wordListRepository.save(WordList.builder()
                .title(title)
                .listDesc(sourceWordList.getListDesc())
                .listType(sourceWordList.getListType())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build());
        List<Subcategory> sourceSubcategories = subcategoryRepository.findAllByWordList(sourceWordList);
        List<Subcategory> targetSubcategories = new ArrayList<>();
        //Create new subcategory and clone
        for (Subcategory subcategory : sourceSubcategories) {
            Subcategory newSubcategory = subcategoryRepository.save(Subcategory.builder()
                    .title(subcategory.getTitle())
                    .wordList(targetWordList)
                    .amountOfWord(0)
                    .build());
            subcategoryService.cloneSubcategory(subcategory.getSubcategoryId(),
                    newSubcategory.getSubcategoryId());
            targetSubcategories.add(newSubcategory);
        }
        targetWordList.setSubcategories(targetSubcategories);
        return wordListMapper.toWordListDto(targetWordList);
    }

    @Override
    @Transactional
    public WordListResponseDto updateWordList(Long wordListId, WordListRequestDto wordList) {
        String newTitle = wordList.getTitle();
        WordList ownedWordList = getOwnedWordList(wordListId);
        if (wordListRepository.findByTitleAndUser(newTitle, ownedWordList.getUser()) != null && !Objects.equals(newTitle, ownedWordList.getTitle())) {
            throw new DuplicateDataException("Title is existed");
        }
        ownedWordList.setTitle(newTitle);
        ownedWordList.setListDesc(wordList.getListDesc());
        ownedWordList.setListType(ListType.valueOf(wordList.getListType().toUpperCase()));
        return wordListMapper.toWordListDto(wordListRepository.save(ownedWordList));
    }

    @Override
    @Transactional
    public void deleteWordList(Long wordListId) {
        WordList wordList = getOwnedWordList(wordListId);
        List<Long> subcategories = subcategoryRepository.findAllByWordList(wordList).stream()
                .map(Subcategory::getSubcategoryId)
                .toList();
        subcategoryService.deleteSubcategories(wordListId, subcategories);
        wordListRepository.delete(wordList);
    }

    @Override
    public WordList getOwnedWordList(Long wordListId) {
        User user = Objects.requireNonNull(AuthenticationUtils.getUserFromSecurityContext());
        return (user.getRole().getName().equals(RoleName.LEARNER))
                ? wordListRepository.findByUserAndWordListId(user, wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"))
                : wordListRepository.findById(wordListId)
                .orElseThrow(() -> new EntityNotFoundException("You do not have permission to access this WordList"));
    }

    @Override
    public String generateUniqueTitle(String title) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        List<String> existingWordLists = wordListRepository.findAllByTitleStartingWithAndUser(title, user).stream()
                .map(WordList::getTitle).toList();
        if (existingWordLists.isEmpty()) {
            return title;
        } else {
            int count = 1;
            String newTitle;
            do {
                count++;
                newTitle = title + " (" + count + ")";
            } while (existingWordLists.contains(newTitle));
            return newTitle;
        }
    }
}