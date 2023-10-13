package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.SubcategoryDto;
import com.pbl6.dictionaryappbe.exception.DuplicateDataException;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.subcategory.SubcategoryType;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.SubcategoryRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import com.pbl6.dictionaryappbe.utils.AuthenticationUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final WordListRepository wordListRepository;

    @Override
    public List<Subcategory> getAllSubcategories(Long id) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        WordList wordList = wordListRepository.findByUserAndWordListId(user, id)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        return subcategoryRepository.findAllByWordList(wordList);
    }

    @Override
    @Transactional
    public Subcategory createSubcategory(SubcategoryDto subcategory) {
        Long wordListId = subcategory.getWordListId();
        String title = subcategory.getTitle();
        WordList wordList = wordListRepository.findByUserAndWordListId(AuthenticationUtils.getUserFromSecurityContext(), wordListId)
                .orElseThrow(() -> new AccessDeniedException("You do not have permission to access this WordList"));
        if (subcategoryRepository.findByTitleAndWordList(title, wordList) != null) {
            throw new DuplicateDataException("Title's subcategory is existed");
        }
        Subcategory newSubcategory = Subcategory.builder()
                .title(title)
                .amountOfWord(0)
                .subcategoryType(SubcategoryType.valueOf(subcategory.getSubcategoryType().toUpperCase()))
                .wordList(wordList)
                .subcategoryDetails(new ArrayList<>())
                .build();
        return subcategoryRepository.save(newSubcategory);
    }

    @Override
    @Transactional
    public Subcategory updateSubcategory(Long id, SubcategoryDto subcategory) {
        String title = subcategory.getTitle();
        Subcategory oldSubcategory = getOwnedSubcategory(id);
        if (subcategoryRepository.findByTitleAndWordList(title, oldSubcategory.getWordList()) != null && !title.equals(oldSubcategory.getTitle())) {
            throw new DuplicateDataException("Duplicate title's subcategory");
        }
        oldSubcategory.setTitle(title);
        oldSubcategory.setSubcategoryType(SubcategoryType.valueOf(subcategory.getSubcategoryType().toUpperCase()));
        return subcategoryRepository.save(oldSubcategory);
    }

    @Override
    @Transactional
    public void deleteSubcategory(Long id) {
        subcategoryRepository.delete(getOwnedSubcategory(id));
    }

    @Override
    public Subcategory getOwnedSubcategory(Long id) {
        User user = AuthenticationUtils.getUserFromSecurityContext();
        Subcategory subcategory = subcategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subcategory not found with ID:" + id));
        if (wordListRepository.findByUserAndWordListId(user, subcategory.getWordList().getWordListId()).isEmpty()) {
            throw new AccessDeniedException("You do not have permission to access this WordList");
        }
        return subcategory;
    }
}
