import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import ItemWordList from "../ItemWordList/ItemWordList";
import { getPublic } from "~/api/WordList";
import { LinearGradient } from "expo-linear-gradient";
export default function WordListPublic() {
  const [defaultList, setDefaultList] = useState([]);
  useEffect(() => {
    const getPublicWordList = async () => {
      const data = await getPublic();
      setDefaultList(data);
    };
    getPublicWordList();
  }, []);
  return (
    <LinearGradient
      colors={["#fff", "rgb(241 245 249)", "rgb(248 250 252)"]}
      style={tw`pt-2 pr-2 pl-2 pb-2 mb-5  mt-4 bg-stone-50`}
    >
      <View
        style={{
          ...Styles.header,
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={[tw`text-slate-600 tracking-wider text-lg italic`]}>
          Public Wordlist
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
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {defaultList.map((item) => (
          <ItemWordList
            key={item.id}
            src={require("~/assets/communication.png")}
            wordlist={item}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
