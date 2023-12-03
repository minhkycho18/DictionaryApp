import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import {
  colors,
  configFont,
  logout,
  svgWordlist,
  svgleitner,
} from "~/constants/theme";
import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { checkLogin } from "~/helper/Auth";
import { GetInforUser } from "~/api/Auth";
import { delay } from "~/helper";
import AppLoader from "~/components/AppLoader";
export default function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const check = await checkLogin();
      setIsLogin(check);
    };

    checkToken();
  }, []);
  useEffect(() => {
    const getInfor = async () => {
      const res = await GetInforUser();
      setUser(res);
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
        {isLogin ? (
          <View style={{ gap: 10 }}>
            <Image source={require("~/assets/man.png")} style={Styles.image} />
            <Text style={Styles.textName}>{user.name}</Text>
            <Text style={Styles.textEmail}>{user.email}</Text>
          </View>
        ) : (
          <View style={Styles.viewImageLogo}>
            <Image
              source={require("~/assets/logo.png")}
              style={Styles.imageLogo}
            />
            <Text style={{ ...Styles.textName, fontSize: 32 }}>
              English Vocabulary
            </Text>
          </View>
        )}
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            ...Styles.viewProfile,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
          onPress={() => {
            navigation.navigate("ProfileDetail", { user: user });
          }}
        >
          <Ionicons name="person-outline" size={24} color={colors.textColor} />
          <Text style={Styles.textItem}>View Profile</Text>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={() => navigation.navigate("YourWordlist")}
          >
            <SvgXml width="24" height="24" xml={svgWordlist} />
            <Text style={Styles.textItem}>My Word List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.viewProfile}
            onPress={() => navigation.push("LeinerStack")}
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
              setIsLoading(true);
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
