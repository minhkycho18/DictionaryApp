package com.pbl6.dictionaryappbe.persistence.subcategory_detail;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubcategoryDetailId implements Serializable {
    private Long vocabId;
    private Long defId;
    private Long subcategoryId;
}
