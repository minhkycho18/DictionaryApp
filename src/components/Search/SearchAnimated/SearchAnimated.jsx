import React from "react";
import { styles } from "./Styles";
import { EvilIcons } from "@expo/vector-icons";
import { Animated, View, Text, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
function SearchAnimated({ scrollY, handleSearchPress, opacity }) {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <Animated.View
      style={[
        {},
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -300],
                extrapolate: "clamp",
              }),
            },
          ],
          opacity: opacity,
        },
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#5671CC", "#9D97F9"]}
        style={styles.borderStyle}
      >
        <View style={{ backgroundColor: "transparents" }}>
          <Image
            style={styles.img}
            source={require("~/assets/logo.png")}
          ></Image>
        </View>
        <Text style={{ ...styles.title, fontFamily: "Quicksand-Bold" }}>
          Dictionary
        </Text>
        <TouchableOpacity style={styles.searchView} onPress={handleSearchPress}>
          <EvilIcons name="search" size={30} color="#6b7280" />
          <Text style={{ marginLeft: 15, color: "#6b7280" }}>
            Search for a word
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

export default SearchAnimated;
