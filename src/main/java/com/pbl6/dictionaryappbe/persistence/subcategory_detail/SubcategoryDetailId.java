package com.pbl6.dictionaryappbe.persistence.subcategory_detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubcategoryDetailId implements Serializable {
    private Long vocabId;
    private Long defId;
    private Long subcategoryId;
}
