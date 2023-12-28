import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import { Entypo } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
export default function ItemSub({ Sub }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.push("PlayGame", {
      sub: Sub,
    });
  };

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={handlePress}
      disabled={Sub.amountOfWord === 0}
    >
      <View
        style={{ ...Styles.wrapper, opacity: Sub.amountOfWord === 0 ? 0.6 : 1 }}
      >
        <View style={Styles.viewText}>
          <Text
            style={[
              tw`text-lg`,
              {
                fontFamily: "Quicksand-SemiBold",
                color: colors.textTitle,
                letterSpacing: 0.1,
              },
            ]}
          >
            {Sub.title}
          </Text>
          <Text
            style={[
              tw`text-base `,
              {
                color: colors.textColor,
                fontFamily: "Quicksand-Medium",
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
            onPress={handlePress}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
