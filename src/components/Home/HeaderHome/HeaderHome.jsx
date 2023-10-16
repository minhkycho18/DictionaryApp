import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";
import { Styles } from "./Styles";

function HeaderHome() {
  return (
    <View style={Styles.container}>
      <View>
        <Image
          style={Styles.image}
          source={require("~/assets/logo.png")}
        ></Image>
      </View>
      <View style={tw`ml-6`}>
        <Text style={tw`text-white font-bold tracking-wider text-2xl italic`}>
          English Vocabulary
        </Text>
      </View>
    </View>
  );
}

export default HeaderHome;
