package com.pbl6.dictionaryappbe.persistence.vocabdef;

import com.pbl6.dictionaryappbe.persistence.Definition;
import com.pbl6.dictionaryappbe.persistence.leitner.VocabLeitner;
import com.pbl6.dictionaryappbe.persistence.subcategory.Subcategory;
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
    @JoinColumn(name = "def_id", referencedColumnName = "def_id")
    private Definition definition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id")
    private Vocabulary vocabulary;

    @OneToMany(mappedBy = "vocabDef")
    private List<VocabLeitner> vocabLeitners;

    @ManyToMany
    @JoinTable(
            name = "subcategory_detail",
            joinColumns = {
                    @JoinColumn(name = "vocab_id", referencedColumnName = "vocab_id"),
                    @JoinColumn(name = "def_id", referencedColumnName = "def_id")
            },
            inverseJoinColumns = @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id"))
    private List<Subcategory> subcategories;
}
