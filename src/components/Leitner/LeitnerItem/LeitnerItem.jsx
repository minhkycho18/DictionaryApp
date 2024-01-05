import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { IconBook, IconCheck, IconReturn, colors } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export default function LeitnerItem({ type }) {
  const navigation = useNavigation();
  const handleLeitnerDetail = async () => {
    const Level = type?.level;
    navigation.push("LeitnerDetail", {
      level: Level,
      needStudy: type.needStudy,
      levelName: type.levelName,
    });
    

    console.log("test: ", type.levelName);
  };

  const ViewCheck = () => (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: "red",
        position: "absolute",
        top: -10,
        right: -2,
      }}
    ></View>
  );
  const getViewIcon = (type) => {
    switch (parseInt(type.level)) {
      case 0:
        return (
          <View style={{ ...Styles.viewIcon, backgroundColor: "#6c757d" }}>
            <SvgXml width="17" height="17" xml={IconReturn} />
          </View>
        );
      case 7:
        return (
          <View style={{ ...Styles.viewIcon, backgroundColor: "#28a745" }}>
            <SvgXml width="17" height="17" xml={IconCheck} />
          </View>
        );
      default:
        return (
          <View style={Styles.viewIcon}>
            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 18,
                color: "#fff",
              }}
            >
              {type?.level}
            </Text>
            {type.needStudy && <ViewCheck />}
          </View>
        );
    }
  };
  return (
    <View style={Styles.container}>
      {getViewIcon(type)}
      <TouchableOpacity
        style={Styles.viewContent}
        onPress={handleLeitnerDetail}
      >
        <View style={Styles.viewContentLeft}>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                fontSize: 18,
                color: colors.textTitle,
              }}
            >
              {type?.levelName}
            </Text>
          </View>
          <View style={Styles.viewWords}>
            <SvgXml width="18" height="18" xml={IconBook} />
            <Text
              style={{
                fontFamily: "Quicksand-Medium",
                fontSize: 17,
                color: colors.textColor,
              }}
            >
              {type?.amountOfWord}
            </Text>
            <Text
              style={{
                fontFamily: "Quicksand-Medium",
                fontSize: 18,
                color: colors.textColor,
              }}
            >
              words
            </Text>
          </View>
        </View>

        <View style={Styles.viewNext}>
          <MaterialIcons
            name="navigate-next"
            size={28}
            color={colors.textColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
