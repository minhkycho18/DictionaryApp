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
import { deleteVocabLeitner } from "~/api/Leitner";

export default function ItemVocabOfLeitner({
  Vocab,
  onDeleteVocal,
  onAddWord,
  onRemoveWord,
}) {
  const [word, setWord] = useState(Vocab.item.word);
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState(Vocab.item.definition.wordDesc);
  const [isSelected, setIsSelected] = useState(false);

  const wrapRef = useRef();
  const handleDeleteWord = async () => {
    setIsLoading(!isLoading);
    try {
      if (isSelected) {
        setIsSelected(!isSelected);

        const res = await deleteVocabLeitner([
          {
            vocabId: Vocab.item.vocabId,
            defId: Vocab.item.definition.defId,
          },
        ]);
        console.log(res);
        onRemoveWord({
          vocab: Vocab.item,
        });
      } else {
        const res = await deleteVocabLeitner([
          {
            vocabId: Vocab.item.vocabId,
            defId: Vocab.item.definition.defId,
          },
        ]);
        console.log(res);
      }
      setIsLoading(false);
      onDeleteVocal(Vocab.item.vocabId, Vocab.item.definition.defId);
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
      <TouchableOpacity
        style={Styles.container}
        onPress={handleAddWordToSub}
        disabled={Vocab.item.level !== 0 ? true : false}
      >
        <View
          style={{
            ...Styles.wrappered,
            borderLeftColor: GetColor(Vocab.item.pos),
          }}
          ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  numberOfLines={2}
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
                {/* {isLoading && (
                  <ActivityIndicator size="small" color="#2C94E6" />
                )} */}

                {Vocab.item.level != 0 ? (
                  <View style={{ marginRight: 10 }}>
                    {Vocab.item.level != 0 && (
                      <SvgXml
                        width="25"
                        height="25"
                        xml={svgWaitingClock(
                          compareDate(Vocab.item.studyTime)
                            ? "#52c41a"
                            : "#ABABAB"
                        )}
                      />
                    )}
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
                {isLoading ? (
                  <ActivityIndicator size="small" color="#2C94E6" />
                ) : (
                  <TouchableOpacity onPress={() => handleDeleteWord()}>
                    <SvgXml
                      width="18"
                      height="18"
                      xml={svgTrash(colors.textColor)}
                    />
                  </TouchableOpacity>
                )}
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
