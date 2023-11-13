import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { GetColor, delay } from "~/helper";
import {
  addWordDefaultToSub,
  deleteWordInSub,
  getAllWordOfSub,
} from "~/api/Subcategory";
function ItemResult({ vocal, params, onAddSucess, onRemove }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isWordOfSub, setIsWordOfSub] = useState(vocal.item.isAdded);
  const colorPos = GetColor(vocal.item.pos);
  useEffect(() => {
    setIsWordOfSub(vocal.item.isAdded);
  }, [vocal.item]);

  const deleteWord = async () => {
    try {
      await deleteWordInSub(params.wordlistId, params.subcategoryId, [
        {
          vocabId: vocal.item.wordid,
          defId: vocal.item.defId,
        },
      ]);
    } catch (error) {
      console.log(`Delete word in sub Error`, error);
    }
  };
  const addWord = async () => {
    try {
      await addWordDefaultToSub(params.wordlistId, params.subcategoryId, {
        vocabId: vocal.item.wordid,
        defId: vocal.item.defId,
      });
    } catch (error) {
      console.log(`Add word Error`, error);
    }
  };

  const handleAddWordToSub = async () => {
    setIsLoading(!isLoading);
    if (vocal.item.isAdded) {
      // xoa tu khoi sub
      if (isWordOfSub) {
        await deleteWord();
        setIsLoading(false);
        setIsWordOfSub(!isWordOfSub);
      } else {
        await addWord();
        setIsLoading(false);
        setIsWordOfSub(!isWordOfSub);
      }
    } else {
      if (!isAdd) {
        await addWord();
        setIsLoading(false);
        setIsWordOfSub(!isWordOfSub);
        setIsAdd(!isAdd);
        onAddSucess();
      } else {
        await deleteWord();
        setIsLoading(false);
        setIsWordOfSub(!isWordOfSub);
        setIsAdd(!isAdd);
        onRemove();
      }
    }
  };
  //config font
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={handleAddWordToSub}>
      <View style={styles.result}>
        <View style={styles.content}>
          <View style={styles.content_top}>
            <Text
              style={{
                ...styles.content_top_Vocal,
                fontFamily: "Quicksand-Medium",
              }}
            >
              {vocal.item.word}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  ...styles.viewPos,
                  backgroundColor: colorPos,
                }}
              >
                <Text
                  style={{
                    ...styles.content_top_Type,
                    backgroundColor: colorPos,
                  }}
                >
                  {vocal.item.pos}
                </Text>
              </View>

              {isLoading ? (
                <ActivityIndicator size="small" color="#2C94E6" />
              ) : isWordOfSub ? (
                <AntDesign name="checkcircle" size={20} color="#2C94E6" />
              ) : (
                <View style={styles.viewIcon}></View>
              )}
            </View>
          </View>
          <View style={styles.content_bottom}>
            <Text
              numberOfLines={2}
              style={{
                ...styles.content_bottom_Mean,
                fontFamily: "Quicksand-Medium",
              }}
            >
              {vocal.item.wordDesc}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ItemResult;
