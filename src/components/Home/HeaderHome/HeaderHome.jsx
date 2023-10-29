import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
function HeaderHome() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={Styles.container}>
      <View>
        <Image
          style={Styles.image}
          source={require("~/assets/logo.png")}
        ></Image>
      </View>
      <View style={tw`ml-4`}>
        <Text
          style={{ fontFamily: "Quicksand-Bold", fontSize: 25, color: "#fff" }}
        >
          English Vocabulary
        </Text>
      </View>
    </View>
  );
}

export default HeaderHome;
