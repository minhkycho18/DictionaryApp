import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";

function ItemVocalDetail({ definition, color, item, count }) {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wrapper, borderColor: color }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ ...styles.word, fontFamily: "Quicksand-SemiBold" }}
              >
                {count}.{item.word.toLowerCase()}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={
                  definition.isWordOfUserLeitner
                    ? { ...styles.viewIcon, borderColor: "#00BFA5" }
                    : styles.viewIcon
                }
              >
                <Image
                  source={require("~/assets/leitner.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: definition.isWordOfUserWordlist
                      ? "#00BFA5"
                      : "#5E7172",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  definition.isWordOfUserWordlist
                    ? { ...styles.viewIcon, borderColor: "#00BFA5" }
                    : styles.viewIcon
                }
              >
                <AntDesign
                  name="addfolder"
                  size={24}
                  color={
                    definition.isWordOfUserWordlist ? "#00BFA5" : "#5E7172"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ ...styles.definition, fontFamily: "Quicksand-Medium" }}
            >
              {definition.wordDesc}
            </Text>
          </View>
          {definition.examples !== null && (
            <View style={styles.synonym}>
              <Text
                style={{
                  ...styles.example_main,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Examples:
              </Text>
              <Text
                style={{ ...styles.example, fontFamily: "Quicksand-Medium" }}
              >
                {definition.examples}
              </Text>
            </View>
          )}
          {definition.synonyms.length > 0 && (
            <View style={styles.synonym}>
              <Text
                style={{
                  ...styles.synonym_main,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Synonym:
              </Text>
              {definition.synonyms.map((item, index) => (
                <View style={styles.synonym_Item} key={index}>
                  <Text style={styles.synonym_Item__Text}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default ItemVocalDetail;
