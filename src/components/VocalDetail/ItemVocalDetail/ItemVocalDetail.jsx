import React, { useEffect, useState, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { addVocalToLeitner } from "~/api/Leitner";
import { checkLogin } from "~/helper/Auth";
import { useFocusEffect } from "@react-navigation/native";

function ItemVocalDetail({
  definition,
  color,
  item,
  count,
  onPresentModal,
  stateOfSub,
  toastLeitner,
}) {
  const [isWordlist, setIsWordlist] = useState(definition.isWordOfUserWordlist);
  const [isWordOfUserLeitner, setIsWordOfUserLeitner] = useState(
    definition.isWordOfUserLeitner
  );
  const [isLogin, setIsLogin] = useState(false);

  const checkToken = async () => {
    const check = await checkLogin();
    setIsLogin(check);
  };
  const addLeitner = async (vocabId, defId) => {
    try {
      if (isLogin) {
        const res = await addVocalToLeitner({
          vocabId: vocabId,
          defId: defId,
        });
        console.log(res);
        toastLeitner("Success", res, "success");
        setIsWordOfUserLeitner(true);
      } else {
        toastLeitner("Error", "Please login to add", "error");
      }
    } catch (error) {
      console.log(error);
      toastLeitner("Error", error, "error");
    }
  };
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  useEffect(() => {
    if (stateOfSub.state && stateOfSub.defId === definition.defId) {
      console.log(`Sucessfully`);
      setIsWordlist(stateOfSub);
    }
  }, [stateOfSub]);

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
                  isWordOfUserLeitner
                    ? { ...styles.viewIcon, borderColor: "#3BC8F7" }
                    : styles.viewIcon
                }
                onPress={() => addLeitner(item.id, definition.defId)}
              >
                <Image
                  source={require("~/assets/leitner.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: isWordOfUserLeitner ? "#3BC8F7" : "#5E7172",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isWordlist
                    ? { ...styles.viewIcon, borderColor: "#00BFA5" }
                    : styles.viewIcon
                }
                onPress={() =>
                  isLogin
                    ? onPresentModal({
                        vocabId: item.id,
                        defId: definition.defId,
                      })
                    : toastLeitner("Error", "Please login to add", "error")
                }
              >
                <AntDesign
                  name="addfolder"
                  size={24}
                  color={isWordlist ? "#00BFA5" : "#5E7172"}
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
