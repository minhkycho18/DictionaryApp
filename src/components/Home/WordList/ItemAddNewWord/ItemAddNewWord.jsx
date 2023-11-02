import React, { useRef } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { Text } from "react-native";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
export default function ItemAddNewWord({ onAddWordToSub }) {
  const wrapRef = useRef();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
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
            style={[
              tw`tracking-wide text-lg`,
              {
                color: "#182B40",
                fontFamily: "Quicksand-SemiBold",
                marginLeft: 5,
                fontSize: 18,
                letterSpacing: 0.2,
              },
            ]}
          >
            Add a new word
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
