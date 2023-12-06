import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { colors } from "~/constants/theme";
import { getNameLevel } from "~/helper";
export default function BoxesGame({ item }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Image
          source={require("~/assets/leitner.png")}
          style={{
            width: 45,
            height: 45,
            tintColor: colors.textTitle,
          }}
        />
        <View style={Styles.cirle_item}>
          <Text style={Styles.text_add}>+1</Text>
        </View>
        <Text style={Styles.number}>{item.amountOfWord}</Text>
      </View>
      <Text style={Styles.name}>{getNameLevel(item.level)}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
    marginRight: 10,
  },
  name: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 17,
    color: colors.textTitle,
  },
  content: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // backgroundColor: "#F3F3F3",
    backgroundColor: "rgb(228 228 231)",
    alignItems: "center",
    justifyContent: "center",
    // opacity: 0.5,
    // borderBottomWidth: 3,
    // borderBottomColor: colors.textTitle,
  },
  number: {
    fontFamily: "Quicksand-Bold",
    position: "absolute",
    top: 23,
    fontSize: 22,
    alignItems: "center",
    color: colors.textTitle,
  },
  cirle_item: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 6,
    backgroundColor: "#28A745",
  },
  text_add: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 12,
    color: "#fff",
  },
});
