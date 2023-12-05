import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, StatusBar } from "react-native";
import HeaderHome from "~/components/Home/HeaderHome/HeaderHome";
import MyWordList from "~/components/Home/WordList/MyWordList/MyWordList";
import tw from "twrnc";
import WordListDefault from "~/components/Home/WordList/WordListDefault/WordListDefault";
import WordListPublic from "~/components/Home/WordList/WordListPublic/WordListPublic";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { colorSynonym, colors, configFont } from "~/constants/theme";
import ModalSignIn from "~/components/ModalSignIn";
export default function HomeScreen() {
  const [loaded] = useFonts(configFont);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setIsContent] = useState("");
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
        <MyWordList
          onOpenModal={() => {
            setIsOpen(!isOpen);
            setIsContent("access to your own wordlist");
          }}
        />
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
      <ModalSignIn isOpenModal={isOpen} content={content} />
    </SafeAreaView>
  );
}
