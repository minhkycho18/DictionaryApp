import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./Style";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { configFont, colors } from "~/constants/theme";
import { getVocalByKeyWord } from "~/api/Dictionary";
function SearchContent({ history, onRemove }) {
  const { navigate } = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handlePressItem = async (text) => {
    const data = await getVocalByKeyWord(text);
    if (data.content.length > 0) {
      const newArr = data.content.filter((item) => item.word === text);
      navigate("VocalDetail", { vocals: newArr });
    }
  };
  return (
    <View style={styles.main}>
      {history.length > 0 ? (
        <View style={styles.historySearch}>
          <Text style={{ ...styles.Text, fontFamily: "Quicksand-Medium" }}>
            Search History
          </Text>
          <View style={styles.historySearch_content}>
            {history.map((item, index) => (
              <View style={styles.history_item} key={index}>
                <TouchableOpacity onPress={() => handlePressItem(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
                <AntDesign
                  name="closecircle"
                  size={18}
                  color="#9F9F9F"
                  style={styles.iconClose}
                  onPress={() => onRemove(index)}
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.searchResult}>
          <Image source={require("~/assets/search.png")} style={styles.image} />
          <Text style={{ ...styles.Text, fontFamily: "Quicksand-Medium" }}>
            Search something ...
          </Text>
        </View>
      )}
    </View>
  );
}

export default SearchContent;
