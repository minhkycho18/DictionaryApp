package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
}
