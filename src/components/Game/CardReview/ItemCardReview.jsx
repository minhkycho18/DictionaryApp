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
        onFlipStart={() => {}}
      >
        {/* Face Side */}
        <View style={Styles.cardFace}>
          <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: 90,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
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
              <Entypo name="sound-mute" size={24} color="#ccc" />
            )}
          </TouchableOpacity>
          <View style={Styles.content}>
            <Text
              style={{
                ...Styles.word,
                fontFamily: "Quicksand-Bold",
                textAlign: "center",
              }}
            >
              {vocal.word}
            </Text>
            {vocal.phoneUs !== null && (
              <View style={Styles.viewPos}>
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
            )}
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
            {/* <View style={Styles.synonym}>
              <Text
                style={{
                  ...Styles.synonym_main,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Synonym:
              </Text>

              <View style={Styles.synonym_Item}>
                <Text style={Styles.synonym_Item__Text}>perfunctorily</Text>
              </View>
              <View style={Styles.synonym_Item}>
                <Text style={Styles.synonym_Item__Text}>pro forma</Text>
              </View>
              <View style={Styles.synonym_Item}>
                <Text style={Styles.synonym_Item__Text}>pro forma</Text>
              </View>
            </View> */}
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
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                transform: [{ rotate: "180deg" }],
              }}
            />
            <Text
              style={{ ...Styles.textButton, fontFamily: "Quicksand-Bold" }}
            >
              Click to see example
            </Text>
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        <View style={Styles.cardBack}>
          <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: 90,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
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
              <Entypo name="sound-mute" size={24} color="#ccc" />
            )}
          </TouchableOpacity>
          <View style={{ ...Styles.content, marginTop: "1%" }}>
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
                height: 120,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                transform: [{ rotate: "180deg" }],
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
