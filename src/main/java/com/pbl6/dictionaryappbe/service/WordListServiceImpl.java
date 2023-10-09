package com.pbl6.dictionaryappbe.service;

import com.pbl6.dictionaryappbe.dto.WordListDto;
import com.pbl6.dictionaryappbe.persistence.user.User;
import com.pbl6.dictionaryappbe.persistence.wordlist.WordList;
import com.pbl6.dictionaryappbe.repository.UserRepository;
import com.pbl6.dictionaryappbe.repository.WordListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WordListServiceImpl implements WordListService {

    private final WordListRepository wordListRepository;

    private final UserRepository userRepository;

    @Override
    public List<WordList> getAll() {
        return wordListRepository.findAll();
    }

    @Override
    @Transactional
    public WordList createWordList(WordListDto wordList) {
        User user = userRepository.findByEmail(wordList.getCreatedBy())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + wordList.getCreatedBy()));
        return wordListRepository.save(WordList.builder()
                .title(wordList.getTitle())
                .listDesc(wordList.getListDesc())
                .createdBy(wordList.getCreatedBy())
                .subcategories(new ArrayList<>())
                .user(user)
                .build());
    }

    @Override
    @Transactional
    public WordList updateTitle(Long wordListId, WordListDto wordList) {
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
    @Transactional
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
