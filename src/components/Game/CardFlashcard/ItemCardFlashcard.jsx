import React, { useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, incorrect_correct_back } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { Audio } from "expo-av";
export default function ItemCardFlashcard({ onNextSlider, vocal }) {
  const [isFlip, setIsFlip] = useState(false);
  const playSound = async (audio) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: audio,
    });
    await sound.playAsync();
  };
  const hanleClickAnswer = (answer) => {
    console.log(`Answer :: ${answer}   Result :: ${vocal.result}`);
    if (answer === vocal.result) {
      onNextSlider({
        vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
        answer: true,
      });
    } else {
      onNextSlider({
        answer: false,
      });
    }
  };
  return (
    <>
      <FlipCard
        style={Styles.card}
        friction={10}
        perspective={5000}
        flipHorizontal={true}
        flipVertical={false}
        flip={isFlip}
        clickable={false}
        onFlipStart={() => {}}
      >
        {/* Face Side */}
        <View style={Styles.cardFace}>
          <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: 90,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              tintColor: "#4DB5AA",
            }}
          />
          <TouchableOpacity
            style={Styles.viewSound}
            onPress={() => playSound(vocal?.audioUk)}
          >
            <AntDesign name="sound" size={24} color="#00BFA5" />
          </TouchableOpacity>
          <View style={Styles.content}>
            <Text style={{ ...Styles.word, fontFamily: "Quicksand-Bold" }}>
              {vocal?.word}
            </Text>
            <View style={Styles.viewPos}>
              <View style={Styles.type}>
                <Text
                  style={{
                    ...Styles.textType,
                    fontFamily: "Quicksand-Bold",
                  }}
                >
                  {vocal?.pos}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={Styles.bottom}
            onPress={() => setIsFlip(true)}
          >
            <Image
              source={require("~/assets/wave.png")}
              style={{
                width: "100%",
                height: 120,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                transform: [{ rotate: "180deg" }],
                tintColor: "#4DB5AA",
              }}
            />
            <Text
              style={{ ...Styles.textButton, fontFamily: "Quicksand-Bold" }}
            >
              Tap to see the definition
            </Text>
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        <View style={Styles.cardBack}>
          <View style={{ ...Styles.content, marginTop: "50%" }}>
            <View style={Styles.viewExample}>
              <View style={Styles.example}>
                <Text
                  style={{
                    ...Styles.word,
                    fontFamily: "Quicksand-SemiBold",
                    fontSize: 18,
                    color: colors.textColor,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {vocal?.question}
                </Text>
              </View>
            </View>
            {/* //sys */}
          </View>

          <TouchableOpacity
            style={Styles.back}
            onPress={() => setIsFlip(false)}
          >
            <SvgXml
              style={{ right: "15%" }}
              width="27"
              height="27"
              xml={incorrect_correct_back.back}
            />
          </TouchableOpacity>

          <View style={Styles.ConfirmButton}>
            <TouchableOpacity
              style={Styles.Incorrect}
              // onPress={() => setIsFlip(false)}
              onPress={() => hanleClickAnswer(false)}
            >
              <View
                style={{
                  ...Styles.circle,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F50057",
                }}
              >
                <SvgXml
                  width="30"
                  height="30"
                  xml={incorrect_correct_back.incorrect}
                />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  color: "#F50057",
                  position: "absolute",
                  bottom: "30%",
                  fontFamily: "Quicksand-Bold",
                }}
              >
                False
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.Correct}
              // onPress={() => setIsFlip(false)}
              onPress={() => hanleClickAnswer(true)}
            >
              <View
                style={{
                  ...Styles.circle,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#388E3C",
                }}
              >
                <SvgXml
                  width="26"
                  height="26"
                  xml={incorrect_correct_back.correct}
                />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  color: "#5C995C",
                  position: "absolute",
                  bottom: "30%",
                  fontFamily: "Quicksand-Bold",
                }}
              >
                True
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </FlipCard>
    </>
  );
}
