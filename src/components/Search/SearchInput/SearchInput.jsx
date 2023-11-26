import React, { useState, useRef } from "react";
import { TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./Style";
import { LinearGradient } from "expo-linear-gradient";
const SearchInput = ({ onChange, onBackPress }) => {
  const [search, setSearch] = useState("");
  const [clear, setClear] = useState(false);
  const input = useRef();
  const handleClear = () => {
    setSearch("");
    setClear(false);
    input.current.focus();
  };
  const handleTextChange = (text) => {
    setSearch(text);
    onChange(text);
    setClear(true);
  };
  return (
    <LinearGradient
      colors={["#5671CC", "#9D97F9"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.headerSearch}
    >
      <View style={{ marginRight: 10 }}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          onPress={onBackPress}
        />
      </View>
      <View style={styles.searchView}>
        <View style={styles.searchIcon} pointerEvents="none">
          <EvilIcons name="search" size={30} color="#6b7280" />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search for a word"
          value={search}
          onChangeText={handleTextChange}
          autoFocus={true}
          ref={input}
        />
        {clear && (
          <View style={styles.iconClear}>
            <AntDesign
              name="closecircleo"
              size={24}
              color="#6b7280"
              onPress={handleClear}
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
export default SearchInput;
