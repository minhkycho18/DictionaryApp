import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { GetColor } from "~/helper";
function ItemResult({ vocal }) {
  const { navigate } = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const colorPos = GetColor(vocal.item.pos);
  return (
    <TouchableOpacity>
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

              {vocal.item.isWordOfUserWordlist ? (
                <AntDesign name="checkcircle" size={23} color="green" />
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
