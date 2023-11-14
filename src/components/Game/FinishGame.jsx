import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function FinishGame() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const Success = () => (
    <View style={Styles.circle}>
      <Feather name="check" size={24} color="#fff" />
    </View>
  );
  const Pending = () => (
    <View style={Styles.peding}>
      <Entypo name="controller-record" size={20} color="#56BDB5" />
    </View>
  );
  const Waiting = () => (
    <View style={Styles.waiting}>
      <Entypo name="controller-record" size={20} color="#C7CFD1" />
    </View>
  );
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={colors.textTitle}
            style={{
              marginTop: 4,
              marginLeft: Platform.OS === "ios" ? 20 : 0,
            }}
          />
        </TouchableOpacity>
        <Text style={Styles.titleHeader}>Subcategory 1</Text>
      </View>
      <View style={Styles.wrappered}>
        <Image source={require("~/assets/success.png")} style={Styles.image} />
        <Text style={Styles.toast}>You've finished flascard successfully</Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 40,
            gap: 40,
          }}
        >
          <View style={Styles.viewButton}>
            <Success />
            <TouchableOpacity style={Styles.buttonSuccess}>
              <Text style={Styles.textButtonSuccess}>Review Practice</Text>
            </TouchableOpacity>
            <View style={Styles.lineSuccess}></View>
          </View>
          {/*  */}

          <View style={Styles.viewButton}>
            <Success />
            <TouchableOpacity style={Styles.buttonPending}>
              <Text style={Styles.textButtonPending}>Flashcard Practice</Text>
            </TouchableOpacity>
            <View style={Styles.lineSuccess}></View>
          </View>
          {/*  */}
          <View style={Styles.viewButton}>
            <Pending />
            <TouchableOpacity style={Styles.buttonWaiting}>
              <Text style={Styles.textButtonWaiting}>Spelling Practice</Text>
            </TouchableOpacity>
            <View style={Styles.linePending}></View>
          </View>
          {/*  */}

          <View style={Styles.viewButton}>
            <Waiting />
            <TouchableOpacity style={Styles.buttonWaiting}>
              <Text style={Styles.textButtonWaiting}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  wrappered: {
    marginTop: "7%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    // paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    height: 50,
  },
  titleHeader: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    color: colors.textTitle,
  },
  image: {
    // width: 200,
    // height: 200,
  },
  toast: {
    color: "#24416A",
    fontFamily: "Quicksand-Bold",
    fontSize: 17,
    marginTop: "5%",
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#1CBD9E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    gap: 30,
  },
  peding: {
    width: 32,
    height: 32,
    backgroundColor: "#D2EBE7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  waiting: {
    width: 32,
    height: 32,
    backgroundColor: "#EAECEE",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPending: {
    backgroundColor: "#1CBD9E",
    paddingVertical: 10,
    borderRadius: 20,
    width: 230,
  },
  textButtonPending: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },

  buttonSuccess: {
    backgroundColor: "#F0F4F3",
    width: 230,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textButtonSuccess: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#1CBD9E",
    textAlign: "center",
  },
  buttonWaiting: {
    backgroundColor: "#F0F4F3",
    width: 230,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textButtonWaiting: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#419DE6",
    textAlign: "center",
  },
  lineSuccess: {
    width: 4,
    height: 35,
    backgroundColor: "#1CBD9E",
    position: "absolute",
    bottom: -36,
    left: "5%",
    borderRadius: 5,
  },
  linePending: {
    width: 4,
    height: 35,
    backgroundColor: "#E6E6E6",
    position: "absolute",
    bottom: -36,
    left: "4%",
    borderRadius: 5,
  },
});
