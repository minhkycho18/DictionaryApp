import React, { useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
export default function ItemCardReview() {
  const [isFlip, setIsFlip] = useState(false);
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
          <TouchableOpacity style={Styles.viewSound}>
            <AntDesign name="sound" size={24} color="#00BFA5" />
          </TouchableOpacity>
          <View style={Styles.content}>
            <Text style={{ ...Styles.word, fontFamily: "Quicksand-Bold" }}>
              Beautiful
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
                  /ˈbjuː.tɪ.fəl/
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
                  /ˈbjuː.t̬ə.fəl/
                </Text>
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
            <View style={Styles.synonym}>
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
          <TouchableOpacity style={Styles.viewSound}>
            <AntDesign name="sound" size={24} color="#00BFA5" />
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
                <Text
                  style={{
                    ...Styles.word,
                    fontFamily: "Quicksand-SemiBold",
                    fontSize: 17,
                    color: colors.textColor,
                  }}
                >
                  1. They're big as houses.
                </Text>
                <Text
                  style={{
                    ...Styles.word,
                    fontFamily: "Quicksand-SemiBold",
                    fontSize: 17,
                    color: colors.textColor,
                  }}
                >
                  2. They're big as houses big as houses.
                </Text>
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
