import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Styles } from "../ItemVocabOfSub/Styles";
import ItemVocabOfSub from "../ItemVocabOfSub/ItemVocabOfSub";
export default function ItemListVocabOfSub({
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
        <ItemVocabOfSub
          Vocab={item}
          subcategory={subcategory}
          onDeleteVocal={(vocalId, defId) => onDeleteVocal(vocalId, defId)}
        />
      )}
    />
  );
}
