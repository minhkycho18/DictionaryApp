import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { GetColor } from "~/helper";
import { addWordDefaultToSub, getAllWordOfSub } from "~/api/Subcategory";
function ItemResult({ vocal, params, onAddSucess, onError }) {
  const [isLoading, setIsLoading] = useState(false);

  const [isWordOfSub, setIsWordOfSub] = useState(
    vocal.item.isWordOfUserWordlist
  );
  useEffect(() => {
    setIsWordOfSub(vocal.item.isWordOfUserWordlist);
  }, [vocal.item]);
  const { navigate } = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const colorPos = GetColor(vocal.item.pos);
  const handleAddWordToSub = async () => {
    setIsLoading(!isLoading);
    try {
      const words = await getAllWordOfSub(
        params.wordlistId,
        params.subcategoryId
      );
      const check = words.find(
        (item) => item.definition.defId === vocal.item.defId
      )
        ? true
        : false;
      console.log("check ::", check);
      if (check) {
        setIsLoading(false);
        // xoa tu khoi sub
        onError("Error", "Word is exist in subcategory");
      } else {
        const res = await addWordDefaultToSub(
          params.wordlistId,
          params.subcategoryId,
          {
            vocabId: vocal.item.wordid,
            defId: vocal.item.defId,
          }
        );
        // console.log(`Result ::`, res);
        setIsLoading(false);
        setIsWordOfSub(!isWordOfSub);
        onAddSucess();
      }
    } catch (error) {
      console.log(`Add word to subcategory error ::`, error);
    }
  };

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
              <Text
                style={{
                  ...styles.content_top_Type,
                  backgroundColor: colorPos,
                }}
              >
                {vocal.item.pos}
              </Text>

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
