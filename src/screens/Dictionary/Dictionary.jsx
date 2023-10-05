import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Animated } from "react-native";
import { styles } from "./Styles";
import SearchInput from "~/components/Search/SearchInput/SearchInput";
import SearchContent from "~/components/Search/SearchContent/SearchContent";
import SearchAnimated from "~/components/Search/SearchAnimated/SearchAnimated";
import SearchResult from "~/components/Search/SearchResult/SearchResult";
const Dictionary = () => {

  const scrollY = new Animated.Value(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const handleSearchPress = () => {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: -300, // Đẩy khối lên cao nhất
        duration: 100,
        useNativeDriver: false,
      }),
      // Animated.timing(opacity, {
      //   toValue: -300, // Biến mất khối
      //   duration: 500,
      //   useNativeDriver: false,
      // }),
    ]).start(() => {
      // Khi hoàn thành di chuyển, ẩn header search
      setIsHeaderVisible(false);
    });
  };
  const handleTextChange = (searchValue) => {
    
    console.log("Search value:", searchValue);
  };
  const handleBackPress = () =>{
    setIsHeaderVisible(true)
  }

  // Khai báo Animated.Value cho opacity
  const opacity = new Animated.Value(1);

  return (
    <SafeAreaView style={styles.container}>
      {isHeaderVisible && ( <SearchAnimated scrollY={scrollY} handleSearchPress={handleSearchPress} opacity={opacity}/> )}
      {isHeaderVisible && ( <SearchContent /> )}
      {!isHeaderVisible && (<SearchInput  onChange={handleTextChange} onBackPress={handleBackPress}/>   )}
      {!isHeaderVisible && (<SearchResult />   )}
      {!isHeaderVisible && (<SearchResult />   )}
    </SafeAreaView>
  );
};

export default Dictionary;
