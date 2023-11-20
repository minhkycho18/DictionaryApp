import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
export default function ItemCardReview({ vocal }) {
  const [isFlip, setIsFlip] = useState(false);
  const playSound = async (audio) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: audio,
    });
    await sound.playAsync();
  };
  return (
    <>
      <FlipCard
        style={Styles.card}
        friction={10}
        perspective={3000}
        flipHorizontal={true}
        flipVertical={false}
        flip={isFlip}
        clickable={false}
        onFlipStart={() => { }}
      >
        {/* Face Side */}
        <View style={Styles.cardFace}>
          <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: "25%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              tintColor: "#4DB5AA",
              // backgroundColor: 'red',
            }}
          />
          <TouchableOpacity
            style={Styles.viewSound}
            onPress={() => playSound(vocal?.audioUk)}
            disabled={vocal.audioUs === null}
          >
            {vocal.audioUs !== null ? (
              <AntDesign name="sound" size={24} color="#4DB5AA" />
            ) : (
              <Image
                source={require("~/assets/mute.png")}
                style={{ width: 28, height: 28, tintColor: colors.textColor }}
              />
            )}
          </TouchableOpacity>
          <View style={Styles.content}>
            <Text
              style={{
                ...Styles.word,
                fontFamily: "Quicksand-Bold",
                textAlign: "center",
                marginBottom: "6%",
              }}
            >
              {vocal.word}
            </Text>

            <View style={Styles.viewPos}>
              {vocal.phoneUs !== null && (
                <View style={Styles.Pos}>
                  <Text
                    style={{
                      ...Styles.word,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                    }}
                  >
                    {vocal?.phoneUs}
                  </Text>
                  <Text
                    style={{
                      ...Styles.word,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                    }}
                  >
                    ,
                  </Text>
                  <Text
                    style={{
                      ...Styles.word,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                    }}
                  >
                    {vocal?.phoneUk}
                  </Text>
                </View>
              )}
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

            <View style={Styles.viewdef}>
              <Text
                numberOfLines={6}
                style={{
                  ...Styles.textDef,
                  fontFamily: "Quicksand-Medium",
                  textAlign: "center",
                }}
              >
                {vocal?.wordDesc}
              </Text>
            </View>
          </View>
          <View
            style={Styles.temp}
          >
          </View>
          <TouchableOpacity
            style={Styles.bottom}
            onPress={() => setIsFlip(true)}
            disabled={vocal?.example === null}
          >
            <Image
              source={require("~/assets/wave.png")}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                transform: [{ rotate: "180deg" }],
                tintColor: "#4DB5AA",

              }}
            />
            {vocal?.example !== null && (
              <Text
                style={{ ...Styles.textButton, fontFamily: "Quicksand-Bold" }}
              >
                Click to see example
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        <View style={Styles.cardBack}>
          <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: "25%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              tintColor: "#4DB5AA",

            }}
          />
          <TouchableOpacity
            style={Styles.viewSound}
            onPress={() => playSound(vocal?.audioUk)}
            disabled={vocal.audioUs === null}
          >
            {vocal.audioUs !== null ? (
              <AntDesign name="sound" size={24} color="#00BFA5" />
            ) : (
              <Image
                source={require("~/assets/mute.png")}
                style={{ width: 28, height: 28, tintColor: colors.textColor }}
              />
            )}
          </TouchableOpacity>
          <View style={{ ...Styles.content, marginTop: "11%" }}>
            <Text
              style={{
                ...Styles.word,
                fontFamily: "Quicksand-Bold",
                fontSize: 28,
              }}
            >
              Examples
            </Text>
            <View style={Styles.viewExample}>
              <View style={Styles.example}>
                {vocal.example !== null && (
                  <Text
                    style={{
                      ...Styles.word,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 17,
                      color: colors.textColor,
                      textAlign: 'center'

                    }}
                  >
                    1. {vocal?.example}
                  </Text>
                )}
              </View>
            </View>
            {/* //sys */}
          </View>

          <TouchableOpacity
            style={Styles.bottom}
            onPress={() => setIsFlip(false)}
          >
            <Image
              source={require("~/assets/wave.png")}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                transform: [{ rotate: "180deg" }],
                tintColor: "#4DB5AA",

              }}
            />
            <Text
              style={{
                ...Styles.textButton,
                fontFamily: "Quicksand-Bold",
                fontSize: 20,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </FlipCard>
    </>
  );
}
