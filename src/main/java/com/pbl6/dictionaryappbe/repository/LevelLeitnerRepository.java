package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.level_leitner.LevelLeitner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelLeitnerRepository extends JpaRepository<LevelLeitner, Integer> {
}