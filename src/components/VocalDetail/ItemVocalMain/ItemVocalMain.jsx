import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import uk from "~/assets/en-circle.png";
import us from "~/assets/us-square.png";
import { styles } from "./Style";
import { UpperText, checkNull } from "~/helper";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
const ItemVocalMain = ({ item, color }) => {
  const playSound = async (audio) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: audio,
    });
    await sound.playAsync();
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wrappered, borderColor: color }}>
        <View style={styles.phonetic}>
          <View style={styles.phoneticWord}>
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                fontSize: 25,
                color: colors.textTitle,
              }}
            >
              {UpperText(item.word)}
            </Text>
          </View>
          <View style={styles.soundIcon}>
            <Text style={{ ...styles.phoneticType, color: color }}>
              [{UpperText(item.pos)}]
            </Text>
          </View>
        </View>
        {checkNull(item.phoneUk) && (
          <View style={styles.languageContainer}>
            <Image source={uk} style={styles.languageFlag} />
            <Text style={styles.phoneticContent}>{item.phoneUk}</Text>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => playSound(item.audioUk)}
            >
              <AntDesign name="sound" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
        {checkNull(item.phoneUs) && (
          <View style={styles.languageContainer}>
            <Image
              source={us}
              style={{ ...styles.languageFlag, borderRadius: 20 }}
            />
            <Text style={styles.phoneticContent}>{item.phoneUs}</Text>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => playSound(item.audioUs)}
            >
              <AntDesign name="sound" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default ItemVocalMain;
