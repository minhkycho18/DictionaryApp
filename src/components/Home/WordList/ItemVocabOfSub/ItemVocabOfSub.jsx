import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { colors, svgreview } from "~/constants/theme";
import Checkbox from "expo-checkbox";

import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { ListVocalContext } from "~/context/ListVocal";

export default function ItemVocabOfSub({
  Vocab,
  onDisplayCheckBox,
  isDisplay,
  onSelect,
  isDisplayDel,
}) {
  const [word, setWord] = useState(Vocab.item.word);
  const [definition, setDefinition] = useState(Vocab.item.definition.wordDesc);
  const [isChecked, setChecked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { isDel } = useContext(ListVocalContext);
  const wrapRef = useRef();

  const handleSelect = () => {
    if (isDelete) {
      console.log("click delete");
      setChecked(!isChecked);
      onSelect({
        vocabId: Vocab.item.vocabId,
        defId: Vocab.item.definition.defId,
      });
    }
  };

  useLayoutEffect(() => {
    setIsDelete(isDisplay);
  }, [isDisplay]);

  useLayoutEffect(() => {
    setIsDelete(isDisplayDel);
  }, [isDisplayDel]);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <>
      <TouchableOpacity
        style={Styles.container}
        onLongPress={() => onDisplayCheckBox()}
        onPress={() => handleSelect()}
      >
        {isDelete && (
          <View>
            <Checkbox
              style={Styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#2C94E6" : undefined}
            />
          </View>
        )}
        <View
          style={{
            ...Styles.wrappered,
            paddingLeft: isDelete ? 20 : 10,
            backgroundColor: isChecked ? "rgb(186 230 253)" : "#FEFEFE",
          }}
          ref={wrapRef}
        >
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View style={{ width: "62%" }}>
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

              {/* Status */}
              <View style={Styles.viewItem}>
                <View Styles={Styles.item}>
                  <View
                    style={{
                      ...Styles.circle,
                      backgroundColor: isChecked ? "rgb(186 230 253)" : "#fff",
                    }}
                  >
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>

                <View Styles={Styles.item}>
                  <View style={Styles.circle}>
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>

                <View Styles={Styles.item}>
                  <View style={Styles.circle}>
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>
              </View>
            </View>

            <View>
              <Text
                numberOfLines={2}
                style={[
                  {
                    color: colors.textColor,
                    fontFamily: "Quicksand-Medium",
                    fontSize: 16,
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
