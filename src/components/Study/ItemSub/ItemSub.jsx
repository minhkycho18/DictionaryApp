import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { Entypo } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
export default function ItemSub({ Sub, onPress }) {
  return (
    <TouchableOpacity style={Styles.container} onPress={() => onPress()}>
      <View style={Styles.wrapper}>
        <View style={Styles.viewText}>
          <Text style={[tw`tracking-wider text-lg  text-slate-900`, {}]}>
            {Sub.title}
          </Text>
          <Text
            style={[
              tw`tracking-wider text-base `,
              {
                color: colors.textColor,
              },
            ]}
          >
            {Sub.amountOfWord} words
          </Text>
        </View>
        <TouchableOpacity style={Styles.viewIcon}>
          <Feather
            name="play-circle"
            size={35}
            color={colors.primary}
            onPress={() => onPress()}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
