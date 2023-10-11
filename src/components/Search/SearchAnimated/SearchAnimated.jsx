import React from "react";
import { styles } from "./Styles";
import { EvilIcons } from "@expo/vector-icons";
import { Animated, View, Text, TouchableOpacity, Image } from "react-native";
function SearchAnimated({ scrollY, handleSearchPress, opacity }) {

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
      <View style={styles.borderStyle}>
        <View style={{backgroundColor: 'transparents'}}>
        <Image style={styles.img} source={require("~/assets/logo.png")}></Image>
        </View>
        <Text style={styles.title}>Dictionary</Text>
      </View>
      <TouchableOpacity style={styles.searchView} onPress={handleSearchPress}>
        <EvilIcons name="search" size={30} color="#6b7280" />
        <Text style={{ marginLeft: 15, color: "#6b7280" }}>
          Search for a word
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default SearchAnimated;
