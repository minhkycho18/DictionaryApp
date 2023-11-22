import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { getAllSubCategory } from "~/api/Subcategory";
export default function ItemPublicWordlist({ wordlist, onClone }) {
  const [loaded] = useFonts(configFont);
  // const [wordLists, setWordLists] = useState([]);
  const [subs, setSubs] = useState([]);
  const navigation = useNavigation();
  const getSubCategory = async () => {
    const list = await getAllSubCategory(wordlist.item.id);
    setSubs(list);
  };
  useEffect(() => {
    getSubCategory();
  }, []);
  if (!loaded) {
    return null;
  }

  const handleDetailPublicWordList = async () => {
    navigation.push("publicwordlistDetail", {
      Wordlist: {
        id: 1,
        title: "wordlist1",
        listDesc: "wordlist1",
      },
    });
  };
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={handleDetailPublicWordList}
    >
      <View style={Styles.wrappered}>
        <View style={Styles.viewLeft}>
          <View style={Styles.viewImage}>
            <Image
              source={require("~/assets/communication.png")}
              style={Styles.image}
            />
          </View>
        </View>
        <View style={Styles.viewRight}>
          <View style={Styles.viewTitle}>
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                fontSize: 19,
                letterSpacing: 0.1,
                color: colors.textTitle,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {wordlist.item?.title}
            </Text>
            <TouchableOpacity
              style={Styles.cloneButton}
              onPress={() => onClone(wordlist.item.id)}
            >
              <Image
                source={require("~/assets/add-button.png")}
                style={{ width: 25, height: 25, tintColor: colors.textTitle }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 14,
              color: colors.textColor,
              marginBottom: 5,
            }}
          >
            Sub-list: {subs.length}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 14,
              //   S
              color: colors.textColor,
            }}
          >
            {wordlist.item?.listDesc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
