import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";
import { Entypo } from "@expo/vector-icons";
import ItemWordList from "../ItemWordList/ItemWordList";
import { getDefault } from "~/api/WordList";
import { useFonts } from "expo-font";
import { configFont, colors } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
export default function WordListDefault() {
  const [defaultList, setDefaultList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getDefaultWordList = async () => {
      const data = await getDefault();
      setDefaultList(data);
    };
    getDefaultWordList();
  }, []);
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient
      colors={["#fff", "rgb(241 245 249)"]}
      style={tw`pt-1.5 pr-2 pl-2 pb-2 mb-5  mt-2 bg-stone-50`}
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
          Default Wordlist
        </Text>
        <TouchableOpacity
          style={Styles.header}
          onPress={() => navigation.push("publicWordlist", { type: "default" })}
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
            src={require("~/assets/default.png")}
            wordlist={item}
            type={{ type: "default" }}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
