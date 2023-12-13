import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { colors, svgStudy, svgWaitingClock } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Fontisto } from "@expo/vector-icons";
import { svgTrash } from "~/constants/theme";
import { useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { GetColor, compareDate } from "~/helper";

export default function ItemVocabOfLeitner({ Vocab, onAddWord, onRemoveWord }) {
  const [word, setWord] = useState(Vocab.item.word);
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState(Vocab.item.definition.wordDesc);
  const [isSelected, setIsSelected] = useState(false);

  const wrapRef = useRef();
  const handleDeleteWord = async () => {
    try {
    } catch (error) {
      console.log(`Delete word fail::`, error);
    }
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handleAddWordToSub = async () => {
    // console.log('test vocab:  ', Vocab.item);
    if (isSelected) {
      setIsSelected(!isSelected);
      onRemoveWord({
        vocab: Vocab.item,
      });
    } else {
      onAddWord({
        vocab: Vocab.item,
      });
      setIsSelected(!isSelected);
    }
  };
  return (
    <>
      <TouchableOpacity style={Styles.container} onPress={handleAddWordToSub}>
        <View
          style={{
            ...Styles.wrappered,
            borderLeftColor: GetColor(Vocab.item.pos),
          }}
          ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View>
                <Text
                  numberOfLines={1}
                  style={[
                    {
                      color: "#182B40",
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 18,
                      letterSpacing: 0.2,
                    },
                  ]}
                >
                  {word}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {isLoading && (
                  <ActivityIndicator size="small" color="#2C94E6" />
                )}

                {Vocab.item.level != 0 ? (
                  <View
                    style={{
                      paddingTop: 1,
                      paddingBottom: 1,
                      paddingRight: 10,
                      paddingLeft: 10,
                      // paddingTop:5,
                      borderRadius: 7,
                      display: "flex",
                      flexDirection: "row",
                      // alignItems:'center',
                      justifyContent: "center",
                      backgroundColor: "#F5F5F5",
                      marginRight: 15,
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={[
                        {
                          color: colors.textColor,
                          fontFamily: "Quicksand-Medium",
                          fontSize: 14,
                          letterSpacing: 0.2,
                          marginRight: 2,
                        },
                      ]}
                    >
                      Today
                    </Text>
                    <SvgXml
                      width="20"
                      height="20"
                      xml={svgWaitingClock("#ABABAB")}
                    />
                  </View>
                ) : !isSelected ? (
                  <View
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <View style={Styles.viewIcon}></View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <AntDesign name="checkcircle" size={20} color="#2C94E6" />
                  </View>
                )}

                <TouchableOpacity
                //  onPress={() => handleDeleteWord()}
                >
                  <SvgXml
                    width="18"
                    height="18"
                    xml={svgTrash(colors.textColor)}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text
                numberOfLines={2}
                style={[
                  {
                    color: colors.textColor,
                    fontFamily: "Quicksand-Medium",
                    fontSize: 15,
                    letterSpacing: 0.2,
                  },
                ]}
              >
                {definition}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
