import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemVocabOfQuizResult({ index, Vocab }) {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <>
      <View style={Styles.container}>
        <View
          style={{
            ...Styles.wrappered,
          }}
          // ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Quicksand-Bold",
                    fontSize: 17,
                    letterSpacing: 0.2,
                  }}
                >
                  {index}){" "}
                  <Text numberOfLines={1} style={Styles.word}>
                    {Vocab.answer}
                  </Text>
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    color: "#FF7875",
                    fontFamily: "Quicksand-Bold",
                    fontSize: 17,
                    letterSpacing: 0.2,
                    textDecorationLine: "line-through",
                  }}
                >
                  {Vocab.choose}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              ></View>
            </View>

            <View>
              <Text
                numberOfLines={3}
                style={[
                  Styles.definition,
                  {
                    color: colors.textColor,
                  },
                ]}
              >
                {Vocab.question}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
