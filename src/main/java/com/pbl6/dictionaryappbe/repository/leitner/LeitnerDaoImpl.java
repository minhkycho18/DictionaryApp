package com.pbl6.dictionaryappbe.repository.leitner;

import com.pbl6.dictionaryappbe.dto.definition.DefinitionShortDetail;
import com.pbl6.dictionaryappbe.dto.vocabulary.VocabularyLeitnerDetailDto;
import com.pbl6.dictionaryappbe.utils.SqlUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;

public class LeitnerDaoImpl implements LeitnerDao {
    @PersistenceContext
    private EntityManager em;

    private static final String GET_VOCAB_IN_LEITNER_BOX_SQL =
            """
                                        SELECT vl.vocab_id AS vocabId,
                                               v.word,
                                               v.pos,
                                               v.audio_uk AS audioUk,
                                               v.audio_us AS audioUs,
                                               v.phonetics_uk AS phoneUk,
                                               v.phonetics_us AS phoneUs,
                                               vl.level,
                                               vl.last_learning AS lastLearning,
                                               IF(last_learning IS NULL,
                                                   CURRENT_TIMESTAMP(), DATE_ADD(last_learning, INTERVAL ll.time HOUR))
                                                   AS studyTime,
                                               vl.def_id AS defId,
                                               d.word_desc AS wordDesc,
                                               d.examples
                                        FROM vocab_leitner vl
                                        JOIN level_leitner ll
                                            ON ll.level = vl.level
                                        JOIN vocab_def vd
                                            ON vd.vocab_id = vl.vocab_id
                                            AND vd.def_id = vl.def_id
                                        JOIN vocabularies v
                                            ON vd.vocab_id = v.vocab_id
                                        JOIN definitions d
                                            ON d.def_id = vd.def_id
            
                    """;

    private static final String COUNT_ALL_BY_LEVEL_SQL = """
                    SELECT count(*)
                    FROM vocab_leitner
                    WHERE level = :level
            """;

    @Override
    @SuppressWarnings("unchecked")
    public Page<VocabularyLeitnerDetailDto> getVocabInLeitnerBox(Integer level, Long userId, String keyword,
                                                                 String pos, Pageable pageable) {
        Session session = em.unwrap(Session.class);
        StringBuilder builder = new StringBuilder("WHERE ll.level = :level AND user_id = :userId");
        if (keyword != null) {
            builder.append("\nAND word LIKE :keyword ");
        }
        if (pos != null && !StringUtils.isEmpty(pos)) {
            builder.append("\nAND pos = :pos");
        }
        builder.append("\nORDER BY studyTime DESC");
        String currentSql = GET_VOCAB_IN_LEITNER_BOX_SQL + builder;

        NativeQuery<?> query = session.createNativeQuery(currentSql)
                .setTupleTransformer((tuple, aliases) -> {
                    int i = 0;
                    return VocabularyLeitnerDetailDto.builder()
                            .vocabId((Long) tuple[i++])
                            .word((String) tuple[i++])
                            .pos((String) tuple[i++])
                            .audioUk((String) tuple[i++])
                            .audioUs((String) tuple[i++])
                            .phoneUk((String) tuple[i++])
                            .phoneUs((String) tuple[i++])
                            .level((Integer) tuple[i++])
                            .lastLearning(SqlUtils.fromTimestamp(((Timestamp) tuple[i++])))
                            .studyTime(SqlUtils.fromTimestamp(((Timestamp) tuple[i++])))
                            .definition(DefinitionShortDetail.builder()
                                    .defId((Long) tuple[i++])
                                    .wordDesc((String) tuple[i++])
                                    .examples((String) tuple[i])
                                    .build())
                            .build();
                })
                .setParameter("level", level)
                .setParameter("userId", userId)
                .setMaxResults(pageable.getPageSize())
                .setFirstResult(pageable.getPageNumber() * pageable.getPageSize());

        if (keyword != null) {
            query.setParameter("keyword", keyword + "%");
        }
        if (pos != null && !StringUtils.isEmpty(pos)) {
            query.setParameter("pos", pos);
        }

        List<VocabularyLeitnerDetailDto> result = (List<VocabularyLeitnerDetailDto>) query.getResultList();

        Long amountOfElement = session.createNativeQuery(COUNT_ALL_BY_LEVEL_SQL, Long.class)
                .setParameter("level", level)
                .getSingleResult();
        return new PageImpl<>(
                result,
                pageable,
                amountOfElement);
    }
}
