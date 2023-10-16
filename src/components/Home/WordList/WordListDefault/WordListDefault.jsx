import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import ItemWordList from "../ItemWordList/ItemWordList";
import { getDefault } from "~/api/WordList";
export default function WordListDefault() {
  const [defaultList, setDefaultList] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);
  useEffect(() => {
    const getDefaultWordList = async () => {
      const data = await getDefault();
      setDefaultList(data);
    };
    //  getDefaultWordList();
  }, []);
  return (
    <View style={tw`pt-1.5 pr-2 pl-2 pb-2  mt-2 bg-stone-50`}>
      <View
        style={{
          ...Styles.header,
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={tw`text-slate-600 tracking-wider text-lg italic`}>
          CEFR Wordlist
        </Text>
        <TouchableOpacity style={Styles.header}>
          <Text style={tw`text-base text-blue-600`}>See all</Text>
          <AntDesign
            name="right"
            size={14}
            color="rgb(37 99 235)"
            style={{ marginLeft: 3 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={defaultList}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={(item) => (
          <ItemWordList src={require("~/assets/default.png")} />
        )}
      />
    </View>
  );
}
