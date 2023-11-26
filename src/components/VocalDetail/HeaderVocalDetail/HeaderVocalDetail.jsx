import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Style";
import { useNavigation } from "@react-navigation/native";
import { UpperText } from "~/helper";
import tw from "twrnc";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
const HeaderVocalDetail = ({ vocal }) => {
  const navigation = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={["#5671CC", "#9D97F9"]}
      style={styles.headerSearch}
    >
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
      <View style={styles.viewText}>
        <Text
          numberOfLines={1}
          style={{ fontFamily: "Quicksand-Bold", fontSize: 30, color: "#fff" }}
        >
          {UpperText(vocal)}
        </Text>
      </View>
    </LinearGradient>
  );
};
export default HeaderVocalDetail;
