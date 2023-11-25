import React, { useRef, useState, useContext } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { IconLike, colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "~/context/AuthContext";
import { updateStatusGame } from "~/api/Game";
import { SvgXml } from "react-native-svg";
export default function ResultGame({ result, onContinue }) {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={Styles.cardFace}>
      {result.correct / (result.incorrect + result.correct) >= 0.5 ? (
        <View style={Styles.content}>
          <Image
            source={require("~/assets/cleaned.png")}
            style={{ width: 120, height: 120 }}
          />
          <Text
            style={{
              marginTop: -35,
              marginLeft: 18,
              fontFamily: "Quicksand-Bold",
              fontSize: 32,
              color: "#337CCF",
            }}
          >
            Great !
          </Text>
        </View>
      ) : (
        <View style={Styles.content}>
          <Image
            source={require("~/assets/sad.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              marginTop: -20,
              fontFamily: "Quicksand-Bold",
              fontSize: 25,
              color: "#FFC436",
            }}
          >
            Try harder next time !
          </Text>
        </View>
      )}

      <View style={Styles.boxes}>
        <View style={Styles.result}>
          <View style={{ ...Styles.result_Item, borderLeftColor: "#71BA65" }}>
            <View style={Styles.viewText}>
              <Text style={Styles.number}>{result.correct}</Text>
              <Text style={Styles.text}>Correct</Text>
            </View>
          </View>
          <View style={{ ...Styles.result_Item, borderLeftColor: "#E65B53" }}>
            <View style={Styles.viewText}>
              <Text style={Styles.number}>{result.incorrect}</Text>
              <Text style={Styles.text}>Incorrect</Text>
            </View>
          </View>
        </View>

        <View style={Styles.viewButton}>
          <TouchableOpacity style={Styles.button} onPress={() => onContinue()}>
            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 18,
                color: "#4F00AD",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  cardFace: {
    // marginLeft: "5%",
    // height: 500,
    width: "98%",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "80%",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    // position: "absolute",
    height: "36%",
    width: "100%",
    alignItems: "center",
    gap: 25,
    marginTop: 25,
  },
  button: {
    marginTop: "5%",
    width: 200,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4F00AD",
    alignItems: "center",
  },
  boxes: {
    backgroundColor: "rgb(248 250 252)",
    width: "100%",
    height: "60%",
    borderRadius: 40,
  },
  result: {
    marginTop: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  result_Item: {
    width: 140,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderLeftWidth: 5,
  },
  viewText: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    color: colors.textTitle,
  },
  text: {
    marginTop: -8,
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: colors.textColor,
  },
  viewButton: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
});
