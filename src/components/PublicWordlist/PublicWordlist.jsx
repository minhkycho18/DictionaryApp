import React, { useEffect, useState } from "react";
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
import { getPublic } from "~/api/WordList";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { cloneWordlist } from "~/api/WordList";
export default function PublicWordlist() {
  const [search, setSearch] = useState("");
  const [wordlists, setWordlists] = useState([]);
  const getWordlistPublic = async () => {
    const list = await getPublic();
    setWordlists(list);
  };
  const handleClone = async (id) => {
    try {
      const res = await cloneWordlist(id);
      console.log(res);
      showToast("Success", "Clone wordlist successfully", "success");
    } catch (error) {
      showToast("Error", "Clone wordlist fail", "error");
    }
  };
  useEffect(() => {
    getWordlistPublic();
  }, []);

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 20,
    });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ zIndex: 2000 }}>
        <Toast
          config={toastConfig}
          refs={(ref) => {
            Toast.setRef(ref);
          }}
        />
      </View>
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
            // autoFocus={true}
            // ref={clickClear}
          />
        </View>
      </View>
      <View
      // style={{width :'100%', height:20}}
      ></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={wordlists}
        renderItem={(item) => (
          <ItemPublicWordlist wordlist={item} onClone={handleClone} />
        )}
      />
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  Seach: {
    width: "100%",
    height: 64,
    borderBottomWidth: 2,
    display: "flex",
    alignItems: "center",
    borderBottomColor: "#ccc",
    justifyContent: "center",
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
    // marginTop: 5,
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
