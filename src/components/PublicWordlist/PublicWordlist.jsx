import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { colors, spacing, sizes, shadow } from "~/constants/theme";
import ItemPublicWordlist from "./ItemPublicWordlist/ItemPublicWordlist";
export default function PublicWordlist() {
  const [search, setSearch] = useState("");
  const arr = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.Seach}>
        <View style={Styles.searchView}>
          <View style={Styles.searchIcon} pointerEvents="none">
            <EvilIcons name="search" size={30} color="#6b7280" />
          </View>
          <TextInput
            style={Styles.field}
            placeholder="Search for a word"
            value={search}
            onChangeText={setSearch}
            autoFocus={true}
            // ref={clickClear}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={arr}
        renderItem={(item) => <ItemPublicWordlist />}
      />
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Seach: {
    width: "100%",
    height: 64,
    borderBottomWidth: 2,
    display: "flex",
    alignItems: "center",
    borderBottomColor: "#ccc",
  },
  field: {
    paddingLeft: spacing.xl + spacing.s,
    paddingRight: spacing.m,
    borderRadius: sizes.radius,
    width: "92%",
    flex: 1,
    ...shadow.light,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  searchView: {
    marginTop: 5,
    backgroundColor: "#fff",
    height: 45,
    width: "85%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconClear: {
    position: "absolute",
    top: 10,
    right: 13,
    zIndex: 1,
  },
});
