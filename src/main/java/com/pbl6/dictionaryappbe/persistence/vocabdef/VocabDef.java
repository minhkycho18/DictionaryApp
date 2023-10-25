package com.pbl6.dictionaryappbe.persistence.vocabdef;

import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.subcategory_detail.SubcategoryDetail;
import com.pbl6.dictionaryappbe.persistence.vocabulary.Vocabulary;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vocab_def")
@IdClass(VocabDefId.class)
public class VocabDef {
    @Id
    @Column(name = "vocab_id")
    private Long vocabId;

    @Id
    @Column(name = "def_id")
    private Long defId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "def_id", referencedColumnName = "def_id", insertable = false, updatable = false)
    private Definition definition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id", insertable = false, updatable = false)
    private Vocabulary vocabulary;

    @OneToMany(mappedBy = "vocabDef")
    private List<VocabLeitner> vocabLeitners;

    @OneToMany(mappedBy = "vocabDef")
    private List<SubcategoryDetail> subcategoryDetails;
}
