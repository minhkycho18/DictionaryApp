import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { colors } from "~/constants/theme";

export default function ItemWordList({ src }) {
  return (
    <TouchableOpacity onPress={() => {}} style={Styles.container}>
      <Image source={src} style={Styles.image} />
      <Text
        numberOfLines={2}
        style={[
          tw`text-white ml-3  mt-2 tracking-wider text-sm italic`,
          {
            color: colors.textColor,
            width: "94%",
            alignItems: "center",
          },
        ]}
      >
        Free Word List
      </Text>
    </TouchableOpacity>
  );
}
