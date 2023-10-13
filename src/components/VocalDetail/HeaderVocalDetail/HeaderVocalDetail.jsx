import React, { useState } from "react";
import { View ,Text, TouchableOpacity} from "react-native";
import { Ionicons  } from "@expo/vector-icons";
import { styles } from "./Style";
import { useNavigation } from "@react-navigation/native";
import { UpperText } from "~/helper";
const HeaderVocalDetail = ({vocal}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerSearch}>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          onPress={() => { navigation.goBack() }}
        />
      </TouchableOpacity>
      <View style={styles.viewText}>
          <Text style={styles.textHeader}>
          {UpperText(vocal)}
          </Text>
      </View>
    </View>
  );
};
export default HeaderVocalDetail;
