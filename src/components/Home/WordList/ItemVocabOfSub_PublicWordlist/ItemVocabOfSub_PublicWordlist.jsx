import React, {
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemVocabOfSub_PublicWordlist({ Vocab, onDeleteVocal, subcategory }) {

  const wrapRef = useRef();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <>
      <TouchableOpacity style={Styles.container}>
        <View
          style={{
            ...Styles.wrappered,
            
          }}
          ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View style={{ width: "90%" }}>
                <Text
                  numberOfLines={1}
                  style={Styles.word}
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
              </View>
            </View>

            <View>
              <Text
                numberOfLines={2}
                style={[Styles.definition,
                  {
                    color: colors.textColor,
                  }]}
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
