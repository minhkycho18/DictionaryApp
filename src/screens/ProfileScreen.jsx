import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import {
  colors,
  configFont,
  logout,
  svgWordlist,
  svgleitner,
} from "~/constants/theme";

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

import {
  CommonActions,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import { checkLogin } from "~/helper/Auth";
import { GetInforUser } from "~/api/Auth";
import { delay } from "~/helper";
import AppLoader from "~/components/AppLoader";
import ModalSignIn from "~/components/ModalSignIn";
export default function Profile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState();
  const [checkAvt, setCheckAvt] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const check = await checkLogin();
      setIsLogin(check);
      setCheckAvt(true);
    };

    checkToken();
  }, []);
  useEffect(() => {
    const getInfor = async () => {
      const res = await GetInforUser();
      setUser(res);
      setAvatar(res.image);
    };
    if (isLogin) {
      getInfor();
    }
  }, [isLogin]);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handleLeitner = async () => {
    navigation.push("Leitner");
  };

  return (
    <SafeAreaView style={Styles.container}>
      <LinearGradient
        colors={["#5671CC", "#9D97F9"]}
        style={Styles.infor}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        {checkAvt &&
          (isLogin ? (
            <View style={{ gap: 10 }}>
              {avatar === null ? (
                <Image
                  source={require("~/assets/man.png")}
                  style={Styles.image}
                />
              ) : (
                <Image source={{ uri: avatar }} style={Styles.image} />
              )}
              <Text style={Styles.textName}>{user.name}</Text>
              <Text style={Styles.textEmail}>{user.email}</Text>
            </View>
          ) : (
            <View style={Styles.viewImageLogo}>
              <Image
                source={require("~/assets/logo.png")}
                style={Styles.imageLogo}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ ...Styles.textName, fontSize: 32 }}>
                  English
                </Text>
                <Text style={{ ...Styles.textName, fontSize: 32 }}>
                  Vocabulary
                </Text>
              </View>
            </View>
          ))}
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            ...Styles.viewProfile,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
          onPress={() => {
            if (isLogin) {
              navigation.push("ProfileDetail", { user: user });
            } else {
              setIsOpenModal(true);
              setContent("see your profile");
            }
          }}
        >
          <Ionicons name="person-outline" size={24} color={colors.textColor} />
          <Text style={Styles.textItem}>View Profile</Text>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={() => {
              if (isLogin) {
                navigation.navigate("YourWordlist", { title: "My Wordlist" });
              } else {
                setIsOpenModal(!isOpenModal);
                setContent("access to your own wordlist");
              }
            }}
          >
            <SvgXml width="24" height="24" xml={svgWordlist} />
            <Text style={Styles.textItem}>My Word List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={() => {
              if (isLogin) {
                navigation.push("LeinerStack");
              } else {
                setIsOpenModal(!isOpenModal);
                setContent("access to your own leitner");
              }
            }}
          >
            <SvgXml width="24" height="24" xml={svgleitner} />
            <Text style={Styles.textItem}>Leitner</Text>
          </TouchableOpacity>
        </View>
        {isLogin ? (
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={async () => {
              await AsyncStorage.clear();

              setIsLoading(true);
              await delay(1500);
              setIsLoading(false);
              setIsLogin(false);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              );
              // navigation.navigate("Home");
            }}
          >
            <Image
              source={require("~/assets/logout.png")}
              style={{ width: 25, height: 25, tintColor: "#BE3144" }}
            />
            <Text style={{ ...Styles.textItem, color: "#BE3144" }}>
              Sign out
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={async () => {
              setIsLoading(!isLoading);
              await delay(1500);
              navigation.push("Authenticate");
            }}
          >
            <Image
              source={require("~/assets/log-in.png")}
              style={{
                width: 30,
                height: 27,
                tintColor: "#0766AD",
                marginLeft: -5,
              }}
            />
            <Text style={{ ...Styles.textItem, color: "#0766AD" }}>
              Sign in
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading && <AppLoader />}
      <ModalSignIn isOpenModal={isOpenModal} content={content} />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  infor: {
    width: "100%",
    height: "28%",
    paddingHorizontal: 26,
  },
  image: {
    marginTop: 20,
    width: 85,
    height: 85,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  textName: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    color: "#fff",
  },
  textEmail: {
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
    color: "#fff",
  },
  viewProfile: {
    flexDirection: "row",
    height: 70,
    paddingHorizontal: 25,
    alignItems: "center",
    gap: 30,
  },
  textItem: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
    color: colors.textColor,
  },
  imageLogo: {
    width: 100,
    height: 100,
  },
  viewImageLogo: {
    width: "80%",
    height: "90%",
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
