package com.pbl6.dictionaryappbe.repository;

import com.pbl6.dictionaryappbe.persistence.contribution_history.ContributionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributionHistoryRepository extends JpaRepository<ContributionHistory, Long> {
}
