import React, { useRef } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { Text } from "react-native";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
export default function ItemAddNewWordlist({ onAddWordList }) {
  const wrapRef = useRef();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={() => onAddWordList()}>
      <View style={[tw`bg-stone-100`, Styles.wrappered]} ref={wrapRef}>
        <Image
          source={require("~/assets/btn_add.png")}
          style={Styles.Image}
        ></Image>
        <View style={Styles.Title_Add}>
          <Text
            numberOfLines={1}
            style={[
              tw`tracking-wide text-base`,
              { color: "#182B40", fontFamily: "Quicksand-Medium" },
            ]}
          >
            Create Word List
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
