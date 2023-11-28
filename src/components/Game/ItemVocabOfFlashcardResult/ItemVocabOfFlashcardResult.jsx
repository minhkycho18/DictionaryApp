import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Entypo } from "@expo/vector-icons";
export default function ItemVocabOfFlashcardResult({ Vocab, index }) {
  const [see, setSee] = useState(false);
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
                <View style={{ width: "50%" }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: "Quicksand-Bold",
                      fontSize: 18,
                      letterSpacing: 0.2,
                    }}
                  >
                    {index})
                    <Text
                      numberOfLines={1}
                      style={{ ...Styles.word, color: "#2A8B71" }}
                    >
                      {" "}
                      Correct:
                    </Text>
                    <Text numberOfLines={1} style={{ ...Styles.word }}>
                      {" "}
                      {Vocab.result.toString()}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: "42%",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text style={{ ...Styles.TextChoose, color: "#B72100" }}>
                    Your answer:
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Styles.TextChoose,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {Vocab.choose.toString()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              ></View>
            </View>
            <Text style={Styles.TextVocal}>{Vocab?.word}</Text>
            <View>
              <Text
                numberOfLines={3}
                style={[
                  Styles.definition,
                  {
                    color: colors.textColor,
                    textDecorationLine: Vocab.result ? "none" : "line-through",
                  },
                ]}
              >
                {Vocab?.question}
              </Text>
            </View>
            {!Vocab.result && (
              <TouchableOpacity
                style={Styles.btnSeeCorrect}
                onPress={() => setSee(!see)}
              >
                <Text style={Styles.textBtnConrrect}>
                  See correct definition
                </Text>
                <Entypo name="chevron-right" size={20} color="#80B3FF" />
              </TouchableOpacity>
            )}

            {!Vocab.result && see && (
              <View>
                <View style={{ marginTop: 5 }}>
                  <Text
                    numberOfLines={3}
                    style={[
                      Styles.definition,
                      {
                        color: colors.textColor,
                      },
                    ]}
                  >
                    {Vocab?.answer}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
