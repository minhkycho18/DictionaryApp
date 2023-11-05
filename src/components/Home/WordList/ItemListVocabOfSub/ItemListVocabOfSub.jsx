import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Styles } from "../ItemVocabOfSub/Styles";
import ItemVocabOfSub from "../ItemVocabOfSub/ItemVocabOfSub";
export default function ItemListVocabOfSub({
  onSelect,
  onDisplayButtonDel,
  onDisplayCheckBox,
  listVocabOfSubCategory,
  isDisplayDel,
}) {
  const [isDisplayCheck, setIsDisplayCheck] = useState(false);

  const handleDisplayCheckBox = async () => {
    setIsDisplayCheck(!isDisplayCheck);
    onDisplayButtonDel();
    onDisplayCheckBox();
  };
  const handleSelect = (data) => {
    onSelect(data);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      vertical
      keyExtractor={(item) => item.definition.defId}
      data={listVocabOfSubCategory}
      renderItem={(item) => (
        <ItemVocabOfSub
          Vocab={item}
          words={listVocabOfSubCategory}
          onDisplayCheckBox={handleDisplayCheckBox}
          isDisplay={isDisplayCheck}
          onSelect={handleSelect}
          isDisplayDel={isDisplayDel}
        />
      )}
    />
  );
}
