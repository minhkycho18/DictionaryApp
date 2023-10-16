import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import HeaderHome from "~/components/Home/HeaderHome/HeaderHome";
import MyWordList from "~/components/Home/WordList/MyWordList/MyWordList";
import tw from "twrnc";
import WordListDefault from "~/components/Home/WordList/WordListDefault/WordListDefault";
export default function Home() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 20,
        flexDirection: "column",
        backgroundColor: "#ffff",
      }}
    >
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyWordList />
        <Text
          style={tw`pl-2 mt-4 font-bold text-slate-600 tracking-wider text-2xl italic`}
        >
          Explore
        </Text>
        <WordListDefault />
        <WordListDefault />
      </ScrollView>
    </SafeAreaView>
  );
}
