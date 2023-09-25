import React from "react";
import { styles } from "./Styles";
import { EvilIcons } from "@expo/vector-icons";
import { Animated, View, Text, TouchableOpacity } from "react-native";
function SearchAnimated({scrollY , handleSearchPress, opacity}) {
    console.log(scrollY)
  return (
    <Animated.View
      style={[
        {},
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1], // Khoảng giá trị ban đầu và cuối
                outputRange: [0, -300], // Khoảng giá trị tương ứng
                extrapolate: "clamp", // Giữ giá trị bên ngoài khoảng inputRange
              }),
            },
          ],
          opacity: opacity,
          // Sử dụng opacity để làm mất khối
        },
      ]}
    >
      <View style={styles.borderStyle}></View>
      <TouchableOpacity style={styles.searchView} onPress={handleSearchPress}>
        <EvilIcons name="search" size={30} color="#989898" />
        <Text style={{ marginLeft: 15, color: "#989898" }}>
          Search for a word
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default SearchAnimated;
