import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { GetColor } from "~/helper";
import { addWordDefaultToSub } from "~/api/Subcategory";
function ItemResult({ vocal, params, onAddSucess }) {
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
      const result = await addWordDefaultToSub(
        params.wordlistId,
        params.subcategoryId,
        {
          vocabId: vocal.item.wordid,
          defId: vocal.item.defId,
        }
      );
      console.log(`Result ::`, result);
      setIsLoading(false);
      setIsWordOfSub(!isWordOfSub);
      onAddSucess();
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
                fontFamily: "Quicksand-Regular",
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
