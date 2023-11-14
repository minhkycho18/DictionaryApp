package com.pbl6.dictionaryappbe.persistence.subcategory_detail;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
import com.pbl6.dictionaryappbe.persistence.vocabdef.VocabDef;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subcategory_detail")
@IdClass(SubcategoryDetailId.class)
public class SubcategoryDetail {
    @Id
    @Column(name = "vocab_id")
    private Long vocabId;

    @Id
    @Column(name = "def_id")
    private Long defId;

    @Id
    @Column(name = "subcategory_id")
    private Long subcategoryId;

    @Column
    private Boolean isQuiz;

    @Column
    private Boolean isFlashcard;

    @Column
    private Boolean isReview;

    @Column
    private Boolean isSpelling;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime lastLearning;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id", insertable = false, updatable = false)
    @JsonIgnore
    private Subcategory subcategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "def_id", referencedColumnName = "def_id", insertable = false, updatable = false),
            @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id", insertable = false, updatable = false)
    })
    @JsonIgnore
    private VocabDef vocabDef;
}
