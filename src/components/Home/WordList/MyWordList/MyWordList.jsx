import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import ItemWordList from "../ItemWordList/ItemWordList";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import ItemCreateWordList from "../ItemCreateWordList/ItemCreateWordList";
import { checkLogin } from "~/helper/Auth";
import { getWordListById } from "~/api/WordList";
export default function MyWordList() {
  const [wordLists, setWordLists] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const check = async () => {
      setIsLogin(await checkLogin());
    };
    const getMyWordList = async () => {
      const data = await getWordListById();
      setWordLists(data);
    };
    check();
    if (isLogin) {
      getMyWordList();
    }
  }, []);
  const handlePressSeeAll = async () => {
    if (!isLogin) {
      console.log("Need To Login");
    }
  };
  return (
    <View style={tw`pt-1.5 pr-2 pl-2 pb-2  mt-5 bg-stone-50`}>
      <View style={{ ...Styles.header, justifyContent: "space-between" }}>
        <Text style={tw`text-slate-600 tracking-wider text-lg italic`}>
          Your Wordlist
        </Text>
        <TouchableOpacity style={Styles.header} onPress={handlePressSeeAll}>
          <Text style={tw`text-base text-blue-600`}>See all</Text>
          <AntDesign
            name="right"
            size={14}
            color="rgb(37 99 235)"
            style={{ marginLeft: 3 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginTop: 20 }}
      >
        <ItemCreateWordList />
        {isLogin &&
          wordLists.map((item) => (
            <ItemWordList
              key={item.id}
              src={require("~/assets/wordlist.png")}
            />
          ))}
      </ScrollView>
    </View>
  );
}
