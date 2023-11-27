import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemVocabOfQuizResult({
  indexx,
  Vocab
}) {
  const [id, setId] = useState(indexx);
  const [answer, setAnswer] = useState(Vocab.answer);
  const [question, setQuestion] = useState(Vocab.question);
  const [choose, setChoose] = useState(Vocab.choose);

  // console.log("test ABC:",  indexx);

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
              <View style={{
                width: "100%",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text numberOfLines={1} style={{
                  fontFamily: "Quicksand-Bold",
                  fontSize: 17,
                  letterSpacing: 0.2,
                }}>
                  {id}) <Text numberOfLines={1} style={Styles.word}>{answer}</Text>
                </Text>

                <Text numberOfLines={1} style={{
                  color: "#F84D4B",
                  fontFamily: "Quicksand-Bold",
                  fontSize: 17,
                  letterSpacing: 0.2,
                  textDecorationLine: 'line-through',
                }}>
                  {choose}
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
                {question}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
