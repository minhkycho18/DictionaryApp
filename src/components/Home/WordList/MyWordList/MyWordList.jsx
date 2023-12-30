import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import ItemWordList from "../ItemWordList/ItemWordList";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import ItemCreateWordList from "../ItemCreateWordList/ItemCreateWordList";
import { checkLogin } from "~/helper/Auth";
import { getWordListById } from "~/api/WordList";
import Toast, { ErrorToast } from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { delay } from "~/helper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "~/constants/theme";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
export default function MyWordList({ onOpenModal }) {
  const [wordLists, setWordLists] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();

  const getMyWordList = async () => {
    const data = await getWordListById();
    setWordLists(data);
  };
  const checkToken = async () => {
    const check = await checkLogin();
    setIsLogin(check);
  };
  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    if (isLogin) {
      getMyWordList();
    }
  }, [isLogin]);
  useFocusEffect(
    useCallback(() => {
      getMyWordList();
      checkToken();
    }, [])
  );

  const handlePressSeeAll = async () => {
    if (!isLogin) {
      // showToast();
      // await delay(1000);
      // navigation.push("Authenticate");
      onOpenModal();
    } else {
      navigation.push("YourWordlist", { title: "Your Wordlist" });
    }
  };
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
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const showToast = () => {
    Toast.show({
      position: "top",
      type: "error",
      text1: "Error",
      text2: "Please login to see your wordlist",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 10,
    });
  };

  return (
    <LinearGradient
      colors={["#fff", "rgb(241 245 249)"]}
      style={tw`pt-1.5 pr-2 pl-2 pb-2   bg-stone-50`}
    >
      <View
        style={{
          ...Styles.header,
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontFamily: "Quicksand-SemiBold",
            fontSize: 18,
            color: colors.textTitle,
          }}
        >
          Your Wordlist
        </Text>
        <TouchableOpacity style={Styles.header} onPress={handlePressSeeAll}>
          <Text
            style={[
              tw`text-base text-blue-600`,
              { fontFamily: "Quicksand-SemiBold" },
            ]}
          >
            See all
          </Text>
          <Entypo
            name="chevron-right"
            size={20}
            color="rgb(37 99 235)"
            style={{ marginTop: 3 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <ItemCreateWordList onPress={handlePressSeeAll} />
        {isLogin &&
          wordLists.map((item) => (
            <ItemWordList
              key={item.id}
              src={require("~/assets/wordlist.png")}
              wordlist={item}
              type={{ type: "mywordlist" }}
            />
          ))}
      </ScrollView>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />
    </LinearGradient>
  );
}
