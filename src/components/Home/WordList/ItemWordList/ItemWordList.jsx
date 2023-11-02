import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { colors } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemWordList({ src, wordlist }) {
  const navigation = useNavigation();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("YourWordlistDetail", {
          Wordlist: {
            id: wordlist.id,
            title: wordlist.title,
            listDesc: wordlist.listDesc,
          },
        });
      }}
      style={Styles.container}
    >
      <View style={Styles.viewImage}>
        <Image source={src} style={Styles.image} />
      </View>
      <Text
        numberOfLines={2}
        style={[
          tw`ml-3  mt-2 `,
          {
            fontFamily: "Quicksand-SemiBold",
            color: colors.textColor,
            textAlign: "center",
            fontSize: 15,
            letterSpacing: 0.1,
          },
        ]}
      >
        {wordlist?.title}
      </Text>
    </TouchableOpacity>
  );
}
