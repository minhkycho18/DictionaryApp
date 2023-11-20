import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
export default function FinishReview() {
  const navigation = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={Styles.cardFace}>
      <View style={Styles.content}>
        <Image
          source={require("~/assets/successPNG.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            marginTop: 10,
            fontFamily: "Quicksand-Bold",
            fontSize: 28,
            color: colors.textTitle,
          }}
        >
          Great
        </Text>
        <Text
          style={{
            fontFamily: "Quicksand-SemiBold",
            fontSize: 18,
            color: colors.textColor,
            textAlign: "center",
            marginTop: -15,
            width: "90%"
          }}
        >
          You've reviewed all the words in this subcategory!
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.push("FinishGame", { type: "review" })}
        >
          <Text
            style={{
              fontFamily: "Quicksand-SemiBold",
              fontSize: 18,
              color: "#fff",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  cardFace: {
    // marginLeft: "5%",
    width: "98%",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    // position: "absolute",
    // top: "20%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    marginTop: "20%",
  },
  button: {
    marginTop: "5%",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#3EB655",
  },
});
