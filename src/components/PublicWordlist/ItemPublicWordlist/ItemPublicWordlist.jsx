import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { IconClone, colors, configFont } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { getAllSubCategory } from "~/api/Subcategory";
import { SvgXml } from "react-native-svg";
export default function ItemPublicWordlist({ wordlist, onClone, type }) {
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
        id: wordlist.item.id,
        title: wordlist.item.title,
        listDesc: wordlist.item.listDesc,
      },
      type: type,
    });
  };
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={handleDetailPublicWordList}
    >
      <View style={Styles.wrappered}>
        <View style={Styles.viewLeft}>
          <View
            style={{
              ...Styles.viewImage,
              borderLeftColor: type === "public" ? "#BFD8C3" : "#A3D5D8",
            }}
          >
            <Image
              source={
                type === "public"
                  ? require("~/assets/communication.png")
                  : require("~/assets/default.png")
              }
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
              <SvgXml
                width="22"
                height="22"
                xml={IconClone(colors.textTitle)}
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
            numberOfLines={2}
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
        <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 5,
              position :'absolute',
              bottom :8,
              right :12
            }}
          >
            <Text
              style={{
                fontFamily: "Quicksand-Medium",
                fontSize: 14,
                //   S
                color: colors.textColor,
              }}
            >
              Created by
            </Text>
            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 14,

                //   S
                color: "#6c757d",
              }}
            >
              {wordlist.item.createdBy}
            </Text>
          </View>
      </View>
    </TouchableOpacity>
  );
}
