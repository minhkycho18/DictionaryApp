import React, { useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
export default function ItemCardReview() {
  const [isFlip, setIsFlip] = useState(false);
  return (
    <>
      <FlipCard
        style={Styles.card}
        friction={10}
        perspective={2000}
        flipHorizontal={true}
        flipVertical={false}
        flip={isFlip}
        clickable={false}
        onFlipStart={() => {}}
      >
        {/* Face Side */}
        <View style={Styles.cardFace}>
          <View style={Styles.top}>
            <Image
              source={require("~/assets/wave.png")}
              style={{ width: "110%", position: "absolute", top: 40 }}
            />
          </View>
          <View style={Styles.content}>
            <Text style={{ ...Styles.word, fontFamily: "Quicksand-Bold" }}>
              Hello
            </Text>
            <View style={Styles.viewPos}>
              <View style={Styles.Pos}>
                <Text
                  style={{
                    ...Styles.word,
                    fontFamily: "Quicksand-SemiBold",
                    fontSize: 16,
                  }}
                >
                  /heˈləʊ/
                </Text>
                <AntDesign name="sound" size={22} color="black" />
              </View>
              <View style={Styles.Pos}>
                <Text
                  style={{
                    ...Styles.word,
                    fontFamily: "Quicksand-SemiBold",
                    fontSize: 16,
                  }}
                >
                  /heˈləʊ/
                </Text>
                <AntDesign name="sound" size={22} color="black" />
              </View>
              <View style={Styles.type}>
                <Text
                  style={{
                    ...Styles.textType,
                    fontFamily: "Quicksand-Bold",
                  }}
                >
                  interjection
                </Text>
              </View>
            </View>
            <View style={Styles.viewdef}>
              <Text
                numberOfLines={6}
                style={{ ...Styles.textDef, fontFamily: "Quicksand-Medium" }}
              >
                said to someone who has just said or done something stupid,
                especially something that shows they are not noticing what is
                happening something that shows they are not noticing what is
                happening
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={Styles.bottom}
            onPress={() => setIsFlip(true)}
          >
            <Image
              source={require("~/assets/wave.png")}
              style={{
                width: "110%",
                position: "absolute",
                transform: [{ rotate: "180deg" }],
                top: -32,
              }}
            />
            <Text
              style={{ ...Styles.textButton, fontFamily: "Quicksand-SemiBold" }}
            >
              Click to see example
            </Text>
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        <View style={Styles.cardBack}>
          <Text>The Back</Text>
          <TouchableOpacity onPress={() => setIsFlip(false)}>
            <Text>Click here</Text>
          </TouchableOpacity>
        </View>
      </FlipCard>
    </>
  );
}
