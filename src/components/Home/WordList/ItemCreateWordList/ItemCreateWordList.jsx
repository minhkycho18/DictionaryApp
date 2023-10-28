import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { colors } from "~/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemCreateWordList({ onPress }) {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={Styles.container}>
        <View style={Styles.content}>
          <Ionicons name="add" size={40} color="#5B5961" />
        </View>
        <Text
          style={[
            tw`mt-2 `,
            {
              fontFamily: "Quicksand-SemiBold",
              color: colors.textColor,
              textAlign: "center",
              fontSize: 15,
            },
          ]}
        >
          Word List Name
        </Text>
      </TouchableOpacity>
    </View>
  );
}
