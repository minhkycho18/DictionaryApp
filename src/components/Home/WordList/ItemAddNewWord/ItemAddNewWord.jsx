import React, { useRef } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { Text } from "react-native";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
export default function ItemAddNewWord({ onAddWordToSub }) {
  const wrapRef = useRef();
  return (
    <TouchableOpacity onPress={onAddWordToSub}>
      <View style={[tw`bg-stone-100`, Styles.wrappered]} ref={wrapRef}>
        <Image
          source={require("~/assets/btn_add.png")}
          style={Styles.Image}
        ></Image>
        <View style={Styles.Title_Add}>
          <Text
            numberOfLines={1}
            style={[tw`tracking-wide text-lg`, { color: "#182B40" }]}
          >
            Add a new word
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
