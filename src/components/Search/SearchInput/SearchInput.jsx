import React, { useState } from "react";
import { TextInput, View} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Style";
const SearchInput = ({ onChange, onBackPress }) => {
  const [search, setSearch] = useState("");
  const [clear , setClear] = useState(false)
  const handleClear = () =>{
     setSearch("")
     setClear(false)
  }
  const handleTextChange = (text) => {
    setSearch(text);
    onChange(text);
    setClear(true)
  };
  return (
    <View style={styles.headerSearch}>
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
        />
        {clear && (
          <View style={styles.iconClear} >
              <EvilIcons name="close" size={30} color="#6b7280" onPress={handleClear}/>
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchInput;
