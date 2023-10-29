import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Style";
import { useNavigation } from "@react-navigation/native";
import { UpperText } from "~/helper";
import tw from "twrnc";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
const HeaderVocalDetail = ({ vocal }) => {
  const navigation = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.headerSearch}>
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
          style={{ fontFamily: "Quicksand-Bold", fontSize: 30, color: "#fff" }}
        >
          {UpperText(vocal)}
        </Text>
      </View>
    </View>
  );
};
export default HeaderVocalDetail;
