import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { Styles } from "../ItemVocabOfSub_PublicWordlist/Styles";
import ItemVocabOfSub_PublicWordlist from "../ItemVocabOfSub_PublicWordlist/ItemVocabOfSub_PublicWordlist";
import { colors } from "~/constants/theme";
export default function ItemListVocabOfSub_PublicWordlist({
  listVocabOfSubCategory,
  subcategory,
  onDeleteVocal,
}) {
  return (
    <>
      {listVocabOfSubCategory.length > 0 ? (
        listVocabOfSubCategory.map((item, index) => (
          <ItemVocabOfSub_PublicWordlist
            Vocab={item}
            subcategory={subcategory}
            onDeleteVocal={(vocalId, defId) => onDeleteVocal(vocalId, defId)}
            key={index}
          />
        ))
      ) : (
        <View
          style={{
            marginTop: 3,
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "center",
            height: 75,
            justifyContent: "center",
            // borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Quicksand-SemiBold",
              fontSize: 17,
              color: colors.textColor,
            }}
          >
            No have vocal in subcategory
          </Text>
        </View>
      )}
    </>
  );
}
