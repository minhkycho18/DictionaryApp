import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
export default function ItemPublicWordlist() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity style={Styles.container}>
      <View style={Styles.wrappered}>
        <View style={Styles.viewLeft}>
          <View style={Styles.viewImage}>
            <Image
              source={require("~/assets/communication.png")}
              style={Styles.image}
            />
          </View>
        </View>
        <View style={Styles.viewRight}>
          <Text
            style={{
              fontFamily: "Quicksand-SemiBold",
              fontSize: 19,
              letterSpacing: 0.1,
              color: colors.textTitle,
            }}
          >
            Animals
          </Text>
          <Text
            numberOfLines={5}
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 14,
              //   S
              color: colors.textColor,
            }}
          >
            Do you like animals? What kind of animal would you like to have as a
            pet? What animal don't you like? Here, you will find a thematic
            wordlist all about animals.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
