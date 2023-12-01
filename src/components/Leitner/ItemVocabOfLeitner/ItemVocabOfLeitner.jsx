import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { colors, svgStudy, svgWaitingClock } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Fontisto } from "@expo/vector-icons";
import { svgTrash } from "~/constants/theme";


import { deleteWordInSub } from "~/api/Subcategory";
import { Image } from "react-native";
export default function ItemVocabOfLeitner({ Vocab }) {

  const [word, setWord] = useState(Vocab.item.word);
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState(Vocab.item.definition.wordDesc);

  const wrapRef = useRef();
  const handleDeleteWord = async () => {
    setIsLoading(!isLoading);
    try {
      const res = await deleteWordInSub(
        subcategory.wordListId,
        subcategory.subcategoryId,
        [
          {
            vocabId: Vocab.item.vocabId,
            defId: Vocab.item.definition.defId,
          },
        ]
      );
      setIsLoading(false);
      console.log(res);
      onDeleteVocal(Vocab.item.vocabId, Vocab.item.definition.defId);
    } catch (error) {
      console.log(`Delete word fail::`, error);
    }
  };
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
                  alignItems:'center',
                }}
              >
                {isLoading && (
                  <ActivityIndicator size="small" color="#2C94E6" />
                )}
                <View
                  style={{
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingRight: 10,
                    paddingLeft: 10,
                    // paddingTop:5,
                    borderRadius: 7,
                    display: 'flex',
                    flexDirection: 'row',
                    // alignItems:'center',
                    justifyContent: 'center',
                    backgroundColor: '#F5F5F5',
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
                        marginRight:2
                      },
                    ]}
                  >
                    Today
                  </Text>
                  <SvgXml
                    width="20"
                    height="20"
                    xml={svgWaitingClock('#ABABAB')}
                  />
                </View>

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
      </View>
    </>
  );
}
