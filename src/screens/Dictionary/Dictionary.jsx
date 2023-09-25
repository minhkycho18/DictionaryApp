import React, { useState } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Animated } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchContent from "../../components/SearchContent/SearchContent";
import SearchAnimated from "../../components/SearchAnimated/SearchAnimated";
import SearchResult from "../../components/SearchResult/SearchResult";
const Dictionary = () => {

  const scrollY = new Animated.Value(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigation = useNavigation();
  const handleSearchPress = () => {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: 300, // Đẩy khối lên cao nhất
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: -3, // Biến mất khối
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Khi hoàn thành di chuyển, ẩn header search
      setIsHeaderVisible(false);
    });
  };
  const handleTextChange = (searchValue) => {
    
    console.log("Search value:", searchValue);
  };

  // Khai báo Animated.Value cho opacity
  const opacity = new Animated.Value(1);

  return (
    <SafeAreaView style={styles.container}>
      {isHeaderVisible && ( <SearchAnimated scrollY={scrollY} handleSearchPress={handleSearchPress} opacity={opacity}/> )}
      {isHeaderVisible && ( <SearchContent /> )}
      {!isHeaderVisible && (<SearchInput  onChange={handleTextChange}/>  )}
      {!isHeaderVisible && (<SearchResult />   )}
      {!isHeaderVisible && (<SearchResult />   )}
    </SafeAreaView>
  );
};

export default Dictionary;
