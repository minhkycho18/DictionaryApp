import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";

export default function ProfileDetailScreen(props) {
  const [user, setUser] = useState(props.route.params.user);
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#5671CC", "#9D97F9"]}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View style={Styles.viewHeader}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#fff"
            style={{ padding: 3, marginTop: 5 }}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={Styles.textHeader}>Profile</Text>
        </View>
        <View style={Styles.content}>
          <Image
            source={require("~/assets/man.png")}
            style={Styles.viewImage}
          />
          <View style={Styles.viewEdit}>
            <FontAwesome name="pencil" size={24} color={colors.textColor} />
          </View>

          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Name</Text>
              <Text style={Styles.textPlacehoder}>{user.name}</Text>
            </View>
          </View>
          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Email</Text>
              <Text style={Styles.textPlacehoder}>{user.email}</Text>
            </View>
          </View>
          <View style={{ ...Styles.ViewItem, borderBottomWidth: 0 }}>
            <View>
              <Text style={Styles.textLabel}>Gender</Text>
              <View style={Styles.viewGender}>
                <View
                  style={{ flexDirection: "row", gap: 10, marginRight: 25 }}
                >
                  {user.gender === "MALE" ? (
                    <View style={Styles.cirle_choose}>
                      <View style={Styles.cirle_child}></View>
                    </View>
                  ) : (
                    <View style={Styles.cirle}></View>
                  )}
                  <Text style={Styles.textLabel}>Male</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {user.gender === "FEMALE" ? (
                    <View style={Styles.cirle_choose}>
                      <View style={Styles.cirle_child}></View>
                    </View>
                  ) : (
                    <View style={Styles.cirle}></View>
                  )}
                  <Text style={Styles.textLabel}>Female</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={Styles.changePass}>
            <Text style={{ ...Styles.textLabel, color: "#9D97F9" }}>
              Change password
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  viewHeader: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    alignItems: "center",
  },
  textHeader: {
    fontFamily: "Quicksand-Bold",
    color: "#fff",
    fontSize: 26,
    letterSpacing: 0.2,
  },
  content: {
    width: "100%",
    height: 400,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 30,
    marginTop: "28%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  viewImage: {
    backgroundColor: "#EDEDED",
    width: 130,
    height: 130,
    borderRadius: 90,
    position: "absolute",
    top: -80,
    left: "53%",
    transform: [{ translateX: -50 }],
  },
  viewEdit: {
    width: "100%",
    alignItems: "flex-end",
  },
  ViewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 25,
    paddingBottom: 8,
  },
  textLabel: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
    color: colors.textColor,
  },
  textPlacehoder: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
    color: colors.textTitle,
  },
  viewGender: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
  },
  cirle: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
  },
  cirle_choose: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#5671CC",
  },
  cirle_child: {
    width: 12,
    height: 12,
    backgroundColor: "#5671CC",
    borderRadius: 6,
  },
  changePass: {
    backgroundColor: "#fff",
    width: 150,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#9D97F9",
    position: "absolute",
    bottom: 25,
    left: "50%",
    transform: [{ translateX: -50 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
