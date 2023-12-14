import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { colors } from "~/constants/theme";
import { delay, getNameLevel } from "~/helper";
export default function BoxesGame({ item, level, changeLevel }) {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [amountOfWord, setAmountOfWord] = useState(item.amountOfWord);
  const decreaseWordShow = async (currentlevel, Declevel, IncLevel) => {
    if (currentlevel === Declevel) {
      setDown(true);
      await delay(1000);
      setAmountOfWord(amountOfWord - 1);
      setDown(false);
    }
    if (currentlevel === IncLevel) {
      setUp(true);
      await delay(1000);

      setAmountOfWord(amountOfWord + 1);
      setUp(false);
    }
  };
  const increaseWordShow = async (currentlevel, Declevel, IncLevel) => {
    if (currentlevel === Declevel && level !== "1") {
      setDown(true);
      await delay(1000);
      setAmountOfWord(amountOfWord - 1);
      setDown(false);
    }
    if (currentlevel === IncLevel && level !== "1") {
      setUp(true);
      await delay(1000);
      setAmountOfWord(amountOfWord + 1);
      setUp(false);
    }
  };
  useEffect(() => {
    if (changeLevel.answer) {
      decreaseWordShow(item.level, changeLevel.level, changeLevel.levelUp);
    } else {
      increaseWordShow(item.level, changeLevel.level, changeLevel.levelUp);
    }

    // increaseWordShow(item.level, changeLevel.levelUp);
  }, [changeLevel]);
  return (
    <View style={{ ...Styles.container }}>
      <View
        style={{
          ...Styles.content,
          opacity: item.level === level ? 0.5 : 1,
          borderBottomWidth: item.level === level ? 4 : 0,
          borderBottomColor: item.level === "7" ? "#5FBF68" : colors.textTitle,
        }}
      >
        <Image
          source={require("~/assets/leitner.png")}
          style={{
            width: 45,
            height: 45,
            tintColor: item.level === "7" ? "#5FBF68" : colors.textTitle,
          }}
        />

        <Text
          style={{
            ...Styles.number,
            color: item.level === "7" ? "#5FBF68" : colors.textTitle,
          }}
        >
          {amountOfWord}
        </Text>
      </View>
      {up && (
        <View style={Styles.cirle_item}>
          <Text style={Styles.text_add}>+1</Text>
        </View>
      )}
      {down && (
        <View style={{ ...Styles.cirle_item, backgroundColor: "red" }}>
          <Text style={Styles.text_add}>-1</Text>
        </View>
      )}
      <Text style={Styles.name}>{getNameLevel(item.level)}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
    marginRight: 10,
  },
  name: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 17,
    color: colors.textTitle,
  },
  content: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "rgb(228 228 231)",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontFamily: "Quicksand-Bold",
    position: "absolute",
    top: 23,
    fontSize: 22,
    alignItems: "center",
    color: colors.textTitle,
  },
  cirle_item: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 6,
    backgroundColor: "#28A745",
  },
  text_add: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 12,
    color: "#fff",
  },
});
