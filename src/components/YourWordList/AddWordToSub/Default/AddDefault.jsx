import React, { useState, useRef, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import { Styles } from "./Styles";
import { getVocalByKeyWord } from "~/api/Dictionary";
import ItemResult from "./ItemResult/ItemResult";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { convertData } from "~/helper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardLoader from "~/components/CardLoader";
export default function AddDefault(props) {
  const [words, setWords] = useState([]);
  const [isFound, setIsFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddSucess, setIsAddSucess] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [clear, setClear] = useState(false);
  const [countWord, setcountWord] = useState(0);
  const clickClear = useRef();
  // const data = useRoute();
  const params = props.route.params;
  const handleTextChange = (text) => {
    setSearch(text);
    setClear(true);
    setIsLoading(false);
    setIsSearch(true);
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
        setIsSearch(false);
      } else {
        setIsFound(false);
        setIsSearch(false);
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
  const handleAddSucess = () => {
    setIsAddSucess(true);
    setcountWord((pre) => pre + 1);
  };
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
          (isSearch ? (
            <View style={Styles.viewLoaderSearch}>
              <View style={Styles.itemLoader}>
                <CardLoader />
              </View>
              <View style={Styles.itemLoader}>
                <CardLoader />
              </View>
            </View>
          ) : isFound ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={words}
              renderItem={(item) => (
                <ItemResult
                  vocal={item}
                  params={params}
                  onAddSucess={handleAddSucess}
                />
              )}
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
      {isAddSucess && (
        <TouchableOpacity style={Styles.viewButtonReturn}>
          <View style={Styles.buttonReturn}>
            <Ionicons name="return-up-back" size={24} color="#fff" />
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                fontSize: 16,
                marginLeft: 4,
                color: "#fff",
              }}
            >
              New words ( {countWord} )
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
