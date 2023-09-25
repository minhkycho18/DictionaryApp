import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./Styles";
function SearchResult() {
  return (
    <TouchableOpacity
      onPress={() => {
        // props.navigation.push("movieDetails", {});
      }}
    >
      <View style={styles.result}>
        <Image
          source={require("../../../assets/big.jpg")}
          style={styles.imageVocal}
        ></Image>
        <View style={styles.content}>
          <View style={styles.content_top}>
            <Text style={styles.content_top_Vocal}>Hello</Text>
            <Text style={styles.content_top_Type}>iterjection</Text>
          </View>
          <View style={styles.content_bottom}>
            <Text numberOfLines={2} style={styles.content_bottom_Mean}>
              a word we say when we see someone and want to great them a word we
              say when we see someone and want to great them{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SearchResult;
