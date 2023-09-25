import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {Ionicons } from "@expo/vector-icons"; 
import { styles } from "./Style";
const SearchInput = ({onChange}) => {
  const [search, setSearch] = useState("");
  const handleTextChange = (text) =>{
    setSearch(text);
    onChange(text);
  }
  return (
    <View style={styles.headerSearch}>
      <View style={{ marginRight: 10 }}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </View>
      <View
        style={styles.searchView}
      >
        <View style={styles.searchIcon} pointerEvents="none">
          <EvilIcons name="search" size={30} color="#989898" />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search for a word"
          value={search}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  );
};
export default SearchInput;
