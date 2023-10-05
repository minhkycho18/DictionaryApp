import React from "react";
import { styles } from "./Styles";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Animated, View, Text, TouchableOpacity, Image } from "react-native";
function SearchAnimated({ scrollY, handleSearchPress, opacity }) {
  console.log(scrollY);
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
      <View style={styles.borderStyle}>
        <Text style={styles.title}>Dictionary</Text>
        <View style={styles.boxContent}>
          <View style={styles.boxContent_item}>
            <Image
              style={styles.img}
              source={require("../../../assets/anh.jpg")}
            ></Image>
            <Text style={styles.text}>English</Text>
          </View>

          <AntDesign style={{ position :'absolute',left :154 ,top :10}} name="arrowright" size={24} color="white" />

          <View style={styles.boxContent_item}>
            <Image
              style={styles.img}
              source={require("~/assets/anh.jpg")}
            ></Image>
            <Text style={styles.text}>English</Text>
          </View>
        </View>
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
