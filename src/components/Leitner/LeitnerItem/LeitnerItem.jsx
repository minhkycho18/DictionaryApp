import React from "react";
import { View, Text } from "react-native";
import { Styles } from "./Styles";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
export default function LeitnerItem({ type }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.viewIcon}>
        <Text
          style={{ fontFamily: "Quicksand-Bold", fontSize: 18, color: "#fff" }}
        >
          {type?.number}
        </Text>
      </View>
      <View style={Styles.viewContent}>
        <View style={Styles.viewContentLeft}>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                fontSize: 19,
                color: colors.textTitle,
              }}
            >
              {type?.day}
            </Text>
          </View>
          <View style={Styles.viewWords}>
            <Octicons
              name="book"
              size={20}
              color={colors.textColor}
              style={{ marginTop: 5 }}
            />
            <Text
              style={{
                fontFamily: "Quicksand-Medium",
                fontSize: 18,
                color: colors.textColor,
              }}
            >
              0
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
      </View>
    </View>
  );
}
