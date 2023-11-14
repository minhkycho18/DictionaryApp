import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Styles } from "../ItemVocabOfSub_PublicWordlist/Styles";
import ItemVocabOfSub_PublicWordlist from "../ItemVocabOfSub_PublicWordlist/ItemVocabOfSub_PublicWordlist";
export default function ItemListVocabOfSub_PublicWordlist({
  listVocabOfSubCategory,
  subcategory,
  onDeleteVocal,
}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      vertical
      keyExtractor={(item) => item.definition.defId}
      data={listVocabOfSubCategory}
      renderItem={(item) => (
        <ItemVocabOfSub_PublicWordlist
          Vocab={item}
          subcategory={subcategory}
          onDeleteVocal={(vocalId, defId) => onDeleteVocal(vocalId, defId)}
        />
      )}
    />
  );
}
