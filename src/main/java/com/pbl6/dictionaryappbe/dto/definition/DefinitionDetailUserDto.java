package com.pbl6.dictionaryappbe.dto.definition;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
public class DefinitionDetailUserDto extends DefinitionDetailDto {
    private Boolean isWordOfUserWordlist;
    private Boolean isWordOfUserLeitner;

    public DefinitionDetailUserDto(DefinitionDetailDto parentDef, Boolean isWordOfUserWordlist, Boolean isWordOfUserLeitner){
        this.setDefId(parentDef.getDefId());
        this.setWordDesc(parentDef.getWordDesc());
        this.setExamples(parentDef.getExamples());
        this.setSynonyms(parentDef.getSynonyms());
        this.isWordOfUserWordlist = isWordOfUserWordlist;
        this.isWordOfUserLeitner = isWordOfUserLeitner;
    }
}
