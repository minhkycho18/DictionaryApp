import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Animated, Text } from "react-native";
import SearchInput from "~/components/Search/SearchInput/SearchInput";
import SearchContent from "~/components/Search/SearchContent/SearchContent";
import SearchAnimated from "~/components/Search/SearchAnimated/SearchAnimated";
import SearchResult from "~/components/Search/SearchResult/SearchResult";
import { getVocalByKeyWord } from "~/api/Dictionary";
import { getSearchHistory, removeHistory } from "~/helper/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import CardLoader from "~/components/CardLoader";
import SplashScreen from "~/components/SplashScreen";

const Dictionary = () => {
  const scrollY = new Animated.Value(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [offset, setOffset] = useState(20);
  const [isFound, setIsFound] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [vocals, setVocals] = useState();
  const [history, setHistory] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
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
    setIsSearch(true);
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
        setIsSearch(false);
      } else {
        setIsFound(false);
        setIsSearch(false);
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
  const handleEndReach = async () => {
    // console.log(`huy`);
    if (vocals.length > 19) {
      try {
        setShowLoader(true);
        const data = await getVocalByKeyWord(searchText, offset);
        setVocals([...vocals, ...data.content]);
        setOffset(offset + 20);
        setShowLoader(false);
      } catch (error) {
        console.log(`error ::`, error);
      }
    }
  };
  // const ListFooterComponent = useCallback(() => {
  //   <SplashScreen />;
  // }, []);

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
        (isSearch ? (
          <View style={styles.viewLoaderSearch}>
            <View style={styles.itemLoader}>
              <CardLoader />
            </View>
            <View style={styles.itemLoader}>
              <CardLoader />
            </View>
          </View>
        ) : isFound ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={vocals}
            renderItem={(item) => (
              <SearchResult vocal={item} onPressItem={handlePressItem} />
            )}
            onEndReached={handleEndReach}
            ListFooterComponent={showLoader && <SplashScreen />}
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
    backgroundColor: "#fff",
  },
  viewLoaderSearch: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  itemLoader: {
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 2,
  },
});
export default Dictionary;
