import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { checkLogin } from "~/helper/Auth";
import { deleteWordLists, getWordListById } from "~/api/WordList";
import ItemWordList from "~/components/YourWordList/ItemWordList/ItemWordList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { useFocusEffect } from "@react-navigation/native";
export default function YourWordList() {
  const [wordLists, setWordLists] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();
  const data = useRoute();
  const getMyWordList = async () => {
    const data = await getWordListById();
    setWordLists(data);
  };
  const refreshWordlist = async (res) => {
    const wordlist = wordLists.filter((item) => item.id !== res.id);
    setWordLists([...wordlist, res]);
  };
  const handleDelete = async (id) => {
    try {
      await deleteWordLists(id);
      const newWordLists = wordLists.filter((item) => item.id !== id);
      setWordLists(newWordLists);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddWordlist = () => {
    navigation.push("AddWordlist");
  };
  useEffect(() => {
    const checkToken = async () => {
      const check = await checkLogin();
      setIsLogin(check);
    };

    checkToken();
  }, []);
  useEffect(() => {
    if (isLogin) {
      getMyWordList();
    }
  }, [isLogin]);
  // useEffect(() => {
  //   if (data.params !== undefined) {
  //     setWordLists([...wordLists, data.params]);
  //   }
  // }, [data.params]);

  useFocusEffect(
    useCallback(() => {
      getMyWordList();
    }, [])
  );
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginTop: 10,
            marginLeft: 13,
            padding: 5,
          }}
        >
          <Entypo
            name="chevron-left"
            size={24}
            color={colors.textTitle}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 4 }}>
          <Text
            style={[
              tw`pl-2`,
              {
                color: colors.textTitle,
                fontFamily: "Quicksand-Bold",
                fontSize: 35,
              },
            ]}
          >
            Your Wordlist
          </Text>
          <Text
            style={[
              tw`pl-2 text-lg `,
              { color: colors.textTitle, fontFamily: "Quicksand-Medium" },
            ]}
          >
            {wordLists.length} Wordlist
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.Button,
            bottom: -10,
          }}
        >
          <Ionicons
            name="add"
            size={25}
            color="white"
            onPress={handleAddWordlist}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlist}>
        <FlatList
          showsVerticalScrollIndicator={false}
          vertical
          keyExtractor={(item) => item.id}
          data={wordLists}
          renderItem={(item) => (
            <GestureHandlerRootView>
              <ItemWordList
                wordlist={item}
                onRefresh={refreshWordlist}
                onDelete={handleDelete}
              />
            </GestureHandlerRootView>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FED3A0",
    width: "100%",
    height: 130,
    borderBottomRightRadius: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Button: {
    width: 40,
    height: 40,
    backgroundColor: "#3D3A4D",
    borderRadius: 10,
    position: "absolute",
    right: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  flatlist: {
    flex: 1,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
