import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { deleteWordInSub } from "~/api/Subcategory";
export default function ItemVocabOfSub({ Vocab, onDeleteVocal, subcategory }) {
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
            paddingLeft: 10,
            backgroundColor: "#FEFEFE",
          }}
          ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View style={{ width: "90%" }}>
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
                  {/* Word {item.id} */}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {isLoading && (
                  <ActivityIndicator size="small" color="#2C94E6" />
                )}
                <TouchableOpacity onPress={() => handleDeleteWord()}>
                  <Ionicons
                    name="close-sharp"
                    size={21}
                    color={colors.textColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text
                numberOfLines={3}
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

            {/* <View style={Styles.viewItem}>
              <View
                style={{
                  ...Styles.circle,
                  backgroundColor: "#fff",
                  borderWidth: Vocab.item.review ? 1.5 : 1,
                  borderColor: Vocab.item.review ? "#9EB8D9" : "#ccc",
                }}
              >
                <SvgXml
                  width="15"
                  height="15"
                  xml={svgStudy(
                    "review",
                    Vocab.item.review ? "#9EB8D9" : "#ccc"
                  )}
                />
              </View>

              <View
                style={{
                  ...Styles.circle,
                  backgroundColor: "#fff",
                  borderWidth: Vocab.item.flashcard ? 1.5 : 1,
                  borderColor: Vocab.item.flashcard ? "#37CABE" : "#ccc",
                }}
              >
                <SvgXml
                  width="15"
                  height="15"
                  xml={svgStudy(
                    "flashcard",
                    Vocab.item.flashcard ? "#37CABE" : "#ccc"
                  )}
                />
              </View>

              <View
                style={{
                  ...Styles.circle,
                  backgroundColor: "#fff",
                  borderWidth: Vocab.item.spelling ? 1.5 : 1,
                  borderColor: Vocab.item.spelling ? "#B7ADFF" : "#ccc",
                }}
              >
                <SvgXml
                  width="15"
                  height="15"
                  xml={svgStudy(
                    "spelling",
                    Vocab.item.spelling ? "#B7ADFF" : "#ccc"
                  )}
                />
              </View>
            </View> */}
          </View>
        </View>
      </View>
    </>
  );
}
