import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { Styles } from "./Styles";
import { getVocalByKeyWord } from "~/api/Dictionary";
import ItemResult from "./ItemResult/ItemResult";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { convertData } from "~/helper";
export default function AddDefault() {
  const [words, setWords] = useState([]);
  const [isFound, setIsFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [clear, setClear] = useState(false);
  const clickClear = useRef();
  const handleTextChange = (text) => {
    setSearch(text);
    setClear(true);
    setIsLoading(false);
  };
  const handleClear = () => {
    setSearch("");
    setClear(false);
    clickClear.current.focus();
  };
  useEffect(() => {
    const getVocals = async (query) => {
      const data = await getVocalByKeyWord(query);

      if (data.content.length > 0) {
        const newVocal = convertData(data.content);
        setWords(newVocal);
        setIsFound(true);
      } else {
        setIsFound(false);
      }
    };
    if (search !== "") {
      const debounceTimeout = setTimeout(() => {
        getVocals(search);
      }, 600);

      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [search]);
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.Seach}>
        <View style={Styles.searchView}>
          <View style={Styles.searchIcon} pointerEvents="none">
            <EvilIcons name="search" size={30} color="#6b7280" />
          </View>
          <TextInput
            style={Styles.field}
            placeholder="Search for a word"
            value={search}
            onChangeText={handleTextChange}
            autoFocus={true}
            ref={clickClear}
          />
          {clear && (
            <View style={Styles.iconClear}>
              <AntDesign
                name="closecircleo"
                size={24}
                color="#6b7280"
                onPress={handleClear}
              />
            </View>
          )}
        </View>
      </View>
      <View style={Styles.content}>
        {isLoading && (
          <View style={Styles.viewImage}>
            <Image
              source={require("~/assets/search.png")}
              style={Styles.image}
            />
            <Text style={{ ...Styles.text, fontFamily: "Quicksand-Medium" }}>
              Type to search words ...
            </Text>
          </View>
        )}
        {!isLoading &&
          (isFound ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={words}
              renderItem={(item) => <ItemResult vocal={item} />}
              keyExtractor={(item) => item.key}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -30,
              }}
            >
              <Text style={{ ...Styles.text, fontFamily: "Quicksand-Medium" }}>
                No results were found.
              </Text>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}
