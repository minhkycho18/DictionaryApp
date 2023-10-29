import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { Animated, Text } from "react-native";
import SearchInput from "~/components/Search/SearchInput/SearchInput";
import SearchContent from "~/components/Search/SearchContent/SearchContent";
import SearchAnimated from "~/components/Search/SearchAnimated/SearchAnimated";
import SearchResult from "~/components/Search/SearchResult/SearchResult";
import { getVocalByKeyWord } from "~/api/Dictionary";
import { getSearchHistory, removeHistory } from "~/helper/asyncStorage";
import { useNavigation } from "@react-navigation/native";
const Dictionary = () => {
  const scrollY = new Animated.Value(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isFound, setIsFound] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [vocals, setVocals] = useState();
  const [history, setHistory] = useState([]);
  const opacity = new Animated.Value(1);
  const { navigate } = useNavigation();
  const getData = async () => {
    const his = await getSearchHistory();
    setHistory(his);
  };
  const handleSearchPress = () => {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: -300,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsHeaderVisible(false);
    });
  };
  const handleTextChange = (searchValue) => {
    setSearchText(searchValue);
  };
  const handleBackPress = () => {
    setIsHeaderVisible(true);
    setVocals([]), setIsFound(true);
    getData();
  };
  const handlePressItem = (text) => {
    const newArr = vocals.filter((item) => item.word === text);
    navigate("VocalDetail", { vocals: newArr });
  };
  const handleRemove = async (index) => {
    await removeHistory(index);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getVocals = async (query) => {
      const data = await getVocalByKeyWord(query);
      if (data.content.length > 0) {
        setVocals(data.content);
        setIsFound(true);
      } else {
        setIsFound(false);
      }
    };
    if (searchText !== "") {
      const debounceTimeout = setTimeout(() => {
        getVocals(searchText);
      }, 600);

      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      {isHeaderVisible && (
        <View style={{ height: "40%", width: "100%" }}>
          <SearchAnimated
            scrollY={scrollY}
            handleSearchPress={handleSearchPress}
            opacity={opacity}
          />
        </View>
      )}
      {isHeaderVisible && (
        <View
          style={{
            height: "60%",
            width: "100%",
            position: "relative",
            // backgroundColor: "#fff",
            zIndex: -1,
          }}
        >
          <SearchContent history={history} onRemove={handleRemove} />
        </View>
      )}

      {!isHeaderVisible && (
        <SearchInput
          onChange={handleTextChange}
          onBackPress={handleBackPress}
        />
      )}
      {!isHeaderVisible &&
        (isFound ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={vocals}
            renderItem={(item) => (
              <SearchResult vocal={item} onPressItem={handlePressItem} />
            )}
          />
        ) : (
          <Text
            style={{
              position: "absolute",
              right: 100,
              bottom: 250,
              fontSize: 20,
            }}
          >
            No results were found
          </Text>
        ))}
    </SafeAreaView>
  );
};
styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
export default Dictionary;
