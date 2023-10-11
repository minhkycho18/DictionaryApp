import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Animated, Text } from "react-native";
import { styles } from "./Styles";
import SearchInput from "~/components/Search/SearchInput/SearchInput";
import SearchContent from "~/components/Search/SearchContent/SearchContent";
import SearchAnimated from "~/components/Search/SearchAnimated/SearchAnimated";
import SearchResult from "~/components/Search/SearchResult/SearchResult";
import { getVocalByKeyWord } from "~/api/Dictionary";
import { getSearchHistory , removeHistory} from "~/helper/asyncStorage";

const Dictionary = () => {
  const scrollY = new Animated.Value(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isFound, setIsFound] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [vocals, setVocals] = useState();
  
  const opacity = new Animated.Value(1);
  const getData = async () => {
    const his = await getSearchHistory();
    setHistory(his);
   
  }
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
    setVocals([]),
    setIsFound(true)
    getData();
  };
  const handleRemove =async (index) => {
    console.log("huy")
    await removeHistory(index)
    getData();
  }
  const [history, setHistory] = useState([]);
  useEffect(() => {
    
    getData();
  },[])

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
        <SearchAnimated
          scrollY={scrollY}
          handleSearchPress={handleSearchPress}
          opacity={opacity}
        />
      )}
      {isHeaderVisible && <SearchContent history={history} onRemove={handleRemove}/>}
      {!isHeaderVisible && (
        <SearchInput
          onChange={handleTextChange}
          onBackPress={handleBackPress}
        />
      )}
      {!isHeaderVisible && ( isFound ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={vocals}
          renderItem={(item) => <SearchResult vocal={item} />}
        />
      ) : (
        <Text style={{position :"absolute" ,right :100 ,bottom :250 ,fontSize :20}}>No results were found</Text>
      ))}
    </SafeAreaView>
  );
};

export default Dictionary;
