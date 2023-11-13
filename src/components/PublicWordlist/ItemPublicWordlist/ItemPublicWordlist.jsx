import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
export default function ItemPublicWordlist(wordlist) {
  const [loaded] = useFonts(configFont);
  // const [wordLists, setWordLists] = useState([]);
  const navigation = useNavigation();
  if (!loaded) {
    return null;
  }

  const handleDetailPublicWordList = async () => {
    navigation.push("publicwordlistDetail", {
      Wordlist: {
        id: 1,
        title: 'wordlist1',
        listDesc: 'wordlist1',
      },
    });
  };
  return (
    <TouchableOpacity style={Styles.container}
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
          <Text
            style={{
              fontFamily: "Quicksand-SemiBold",
              fontSize: 19,
              letterSpacing: 0.1,
              color: colors.textTitle,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            Wordlist1
          </Text>
          <Text
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 14,
              color: colors.textColor,
              marginBottom: 5
            }}
          >
            Sub-list: 2
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
            Description: Do you like animals? What kind of animal would you like to have as a
            pet?
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
