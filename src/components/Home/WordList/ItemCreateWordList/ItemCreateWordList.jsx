import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { colors } from "~/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { checkLogin } from "~/helper/Auth";

export default function ItemCreateWordList() {
  const handlePress = async () => {
    if (!(await checkLogin())) {
      console.log("Need To LogIn");
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={Styles.container}>
      <View style={Styles.content}>
        <Ionicons name="add" size={40} color="#5B5961" />
      </View>
      <Text
        style={[
          tw`text-white mt-2 tracking-wider text-sm italic`,
          {
            textAlign: "center",
            color: colors.textColor,
          },
        ]}
      >
        Word List Name
      </Text>
    </TouchableOpacity>
  );
}
