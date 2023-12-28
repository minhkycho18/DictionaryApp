import React, { useEffect, useState, useCallback } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors, spacing, sizes, shadow } from "~/constants/theme";
import ItemPublicWordlist from "./ItemPublicWordlist/ItemPublicWordlist";
import { getDefault, getPublic } from "~/api/WordList";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { cloneWordlist } from "~/api/WordList";
import { checkLogin } from "~/helper/Auth";
import { useFocusEffect } from "@react-navigation/native";
import ModalSignIn from "../ModalSignIn";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
export default function PublicWordlist(props) {
  const [type, setType] = useState(props.route.params.type);
  const [search, setSearch] = useState("");
  const [tempWordlist, setTempWordlist] = useState([]);
  const [wordlists, setWordlists] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const getWordlist = async () => {
    let list = [];
    if (type === "public") {
      list = await getPublic();
    } else {
      list = await getDefault();
    }

    setWordlists(list);
    setTempWordlist(list);
  };
  const checkToken = async () => {
    const check = await checkLogin();
    setIsLogin(check);
  };
  const handleClone = async (id) => {
    try {
      if (isLogin) {
        const res = await cloneWordlist(id);
        console.log(res);
        showToast("Success", "Clone wordlist successfully", "success");
      } else {
        setIsOpenModal(!isOpenModal);
        setContent("clone wordlist");
      }
    } catch (error) {
      showToast("Error", "Clone wordlist fail", "error");
    }
  };
  useEffect(() => {
    getWordlist();
    checkToken();
  }, []);

  const handleTextChange = (text) => {
    setIsSearch(true);
    setIsClear(true);
    setSearch(text);
  };
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  useEffect(() => {
    if (search !== "") {
      const debounceTimeout = setTimeout(() => {
        const result = tempWordlist.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setWordlists(result);
      }, 600);

      return () => {
        clearTimeout(debounceTimeout);
      };
    } else {
      setIsClear(false);
      setWordlists(tempWordlist);
    }
  }, [search]);

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
      <LinearGradient
        colors={["#5671CC", "#9D97F9"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={Styles.header}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={26}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 4,
            alignItems: "center",
            width: "90%",
          }}
        >
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              color: "#fff",
              fontSize: 27,
              textAlign: "center",
            }}
          >
            {type === "public" ? "Public Wordlist" : "Default Wordlist"}
          </Text>
        </View>
      </LinearGradient>
      <View style={Styles.Seach}>
        <View style={Styles.searchView}>
          <View style={Styles.searchIcon} pointerEvents="none">
            <EvilIcons name="search" size={30} color="#6b7280" />
          </View>
          <TextInput
            style={Styles.field}
            placeholder="Search for a word"
            value={search}
            onChangeText={(text) => handleTextChange(text)}
            // autoFocus={true}
            // ref={clickClear}
          />
          {isClear && (
            <TouchableOpacity
              style={Styles.iconClear}
              onPress={() => {
                setSearch("");
                setIsClear(false);
              }}
            >
              <AntDesign name="closecircleo" size={24} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {wordlists.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={wordlists}
          renderItem={(item) => (
            <ItemPublicWordlist
              wordlist={item}
              onClone={handleClone}
              type={type}
            />
          )}
        />
      ) : (
        isSearch && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Quicksand-Bold",
                color: colors.textTitle,
              }}
            >
              No results were found
            </Text>
          </View>
        )
      )}
      <ModalSignIn isOpenModal={isOpenModal} content={content} />
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  Seach: {
    width: "100%",
    height: 70,
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
  header: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
