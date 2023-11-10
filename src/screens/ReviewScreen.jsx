import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import ItemCardReview from "~/components/Game/CardReview/ItemCardReview";

export default function ReviewScreen() {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={colors.textTitle}
            style={{ marginTop: 4 }}
          />
        </TouchableOpacity>
        <Text style={Styles.titleHeader}>Subcategory 1</Text>
      </View>
      <View style={Styles.wrappered}>
        <View style={Styles.progress}>
          <Progress.Bar
            progress={0.5}
            width={Math.floor(screenWidth) - 40}
            height={8}
          />
          <Text style={Styles.numberCount}>0</Text>
          <Text style={Styles.numberTotal}>20</Text>
        </View>

        <View style={Styles.content}>
          <ItemCardReview />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  wrappered: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "green",
  },
  header: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    height: 50,
  },
  titleHeader: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    color: colors.textTitle,
  },
  progress: {
    marginTop: 40,
    position: "relative",
  },
  numberTotal: {
    position: "absolute",
    top: -20,
    right: 0,
    fontFamily: "Quicksand-SemiBold",
    color: "gray",
  },
  numberCount: {
    position: "absolute",
    top: -20,
    fontFamily: "Quicksand-SemiBold",
    color: "gray",
  },

  content: {
    width: "90%",
    height: "75%",
    marginTop: 50,
  },
});
