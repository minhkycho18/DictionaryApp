import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, StatusBar } from "react-native";
import HeaderHome from "~/components/Home/HeaderHome/HeaderHome";
import MyWordList from "~/components/Home/WordList/MyWordList/MyWordList";
import tw from "twrnc";
import WordListDefault from "~/components/Home/WordList/WordListDefault/WordListDefault";
import WordListPublic from "~/components/Home/WordList/WordListPublic/WordListPublic";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { colorSynonym, colors, configFont } from "~/constants/theme";
export default function HomeScreen() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexDirection: "column",
        backgroundColor: "rgb(241 245 249)",
      }}
    >
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyWordList />
        <Text
          style={{
            fontFamily: "Quicksand-Bold",
            fontSize: 22,
            marginLeft: 9,
            color: colors.textTitle,
            marginTop: 10,
            marginBottom: 4,
          }}
        >
          Explore
        </Text>
        <WordListDefault />
        <WordListPublic />
      </ScrollView>
    </SafeAreaView>
  );
}
