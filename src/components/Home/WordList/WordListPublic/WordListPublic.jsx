import React, { useState, useEffect, useCallback } from "react";
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
import { useFonts } from "expo-font";
import { configFont, colors } from "~/constants/theme";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function WordListPublic() {
  const [defaultList, setDefaultList] = useState([]);
  const navigation = useNavigation();
  const getPublicWordList = async () => {
    const data = await getPublic();
    setDefaultList(data);
  };
  useEffect(() => {
    getPublicWordList();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getPublicWordList();
    }, [])
  );

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient
      colors={["#fff", "rgb(241 245 249)"]}
      style={tw`pt-2 pr-2 pl-2 pb-2 mb-5  mt-4 bg-stone-50`}
    >
      <View
        style={{
          ...Styles.header,
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Quicksand-SemiBold",
            fontSize: 18,
            color: colors.textTitle,
          }}
        >
          Public Wordlist
        </Text>
        <TouchableOpacity
          style={Styles.header}
          onPress={() => navigation.push("publicWordlist", { type: "public" })}
        >
          <Text
            style={[
              tw`text-base text-blue-600`,
              { fontFamily: "Quicksand-SemiBold" },
            ]}
          >
            See all
          </Text>
          <Entypo
            name="chevron-right"
            size={20}
            color="rgb(37 99 235)"
            style={{ marginTop: 3 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {defaultList.map((item) => (
          <ItemWordList
            key={item.id}
            src={require("~/assets/communication.png")}
            wordlist={item}
            type={{ type: "public" }}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
