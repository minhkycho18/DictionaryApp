import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
function HeaderHome() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient
      colors={["#5671CC", "#9D97F9"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={Styles.container}
    >
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
    </LinearGradient>
  );
}

export default HeaderHome;
