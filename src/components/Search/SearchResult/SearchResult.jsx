import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { GetColor } from "~/helper";
import { addSearchToHistory } from "~/helper/asyncStorage";
function SearchResult({vocal}) {

  const { navigate } = useNavigation();
  const colorPos = GetColor(vocal.item.pos) ;
  const handlePressItem = () => {
    addSearchToHistory(vocal.item.word);
    navigate("VocalDetail")
  }
  return (
    
    <TouchableOpacity
      onPress={handlePressItem}
    >
      <View style={styles.result}>
      <View style={styles.content}>
          <View style={styles.content_top}>
            <Text style={styles.content_top_Vocal}>{vocal.item.word}</Text>
            <Text style={{...styles.content_top_Type,backgroundColor:colorPos}}>{vocal.item.pos}</Text>
          </View>
          <View style={styles.content_bottom}>
            <Text numberOfLines={2} style={styles.content_bottom_Mean}>{vocal.item.definitions[0]}</Text>
          </View>
        </View>
       
      </View>
    </TouchableOpacity>
  );
}

export default SearchResult;
