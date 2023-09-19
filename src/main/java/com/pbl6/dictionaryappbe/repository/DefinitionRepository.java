package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.Definition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DefinitionRepository extends JpaRepository<Definition, Long> {
}
