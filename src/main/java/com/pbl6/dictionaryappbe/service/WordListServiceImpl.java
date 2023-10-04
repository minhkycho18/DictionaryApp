package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.WordList;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.repository.UserRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.hibernate.PropertyValueException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WordListServiceImpl implements WordListService {

    private final WordListRepository wordListRepository;

    private final UserRepository userRepository;

    public List<WordList> getAll() {
        return wordListRepository.findAll();
    }

    @Override
    public void createWordList(WordListDto wordList) {
        User user = userRepository.findByEmail(wordList.getCreatedBy());
        wordListRepository.save(WordList.builder()
                .title(wordList.getTitle())
                .listDesc(wordList.getListDesc())
                .createdBy(wordList.getCreatedBy())
                .subcategories(new ArrayList<>())
                .user(user)
                .build());
    }

    @Override
    public WordList updateTitle(Long wordListId, WordListDto wordList) {
        if (wordList.getTitle().isEmpty()) {
            throw new PropertyValueException("Title should not be null", "WordList", "Title");
        }
        Optional<WordList> oldWordListOptional = wordListRepository.findById(wordListId);
        if (oldWordListOptional.isPresent()) {
            WordList oldWordList = oldWordListOptional.get();
            oldWordList.setTitle(wordList.getTitle());
            return wordListRepository.save(oldWordList);
        } else {
            throw new EntityNotFoundException("WordList not found with ID: " + wordListId);
        }
    }

    @Override
    public void deleteWordList(Long id) {
        Optional<WordList> wordListOptional = wordListRepository.findById(id);
        if (wordListOptional.isPresent()) {
            WordList wordList = wordListOptional.get();
            wordListRepository.delete(wordList);
        } else {
            throw new EntityNotFoundException("WordList not found with ID: " + id);
        }
    }
}
