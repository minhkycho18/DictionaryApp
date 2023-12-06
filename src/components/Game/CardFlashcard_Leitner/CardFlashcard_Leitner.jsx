import React, { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, incorrect_correct_back } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { Audio } from "expo-av";
import { GetColor, checkNull } from "~/helper";
import { AuthContext } from "~/context/AuthContext";
export default function CardFlashcard_Leitner({
  onNextSlider,
  vocal,
  totalQuestion,
}) {
  const { setlistFlashCardError } = useContext(AuthContext);
  const [isFlip, setIsFlip] = useState(false);
  const playSound = async (audio) => {
    // const sound = new Audio.Sound();
    // await sound.loadAsync({
    //   uri: audio,
    // });
    // await sound.playAsync();
    console.log('test word: ', vocal);
  };
  const hanleClickAnswer = (answer) => {
    console.log(`Answer :: ${answer}   Result :: ${vocal.result}`);
    if (answer === vocal.result) {
      onNextSlider({
        vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
        answer: true,
      });
    } else {
      setlistFlashCardError((pre) => [
        ...pre,
        {
          result: vocal.result,
          word: vocal.word,
          question: vocal.question,
          answer: vocal.answer,
          choose: answer,
        },
      ]);
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
        onFlipStart={() => { }}
      >
        {/* Face Side */}
        <View style={Styles.cardFace}>
          {/* <Image
            source={require("~/assets/wave.png")}
            style={{
              width: "100%",
              height: "25%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              tintColor: "#4DB5AA",
            }}
          /> */}
          <View style={Styles.headercard}>
            {/* Preposition */}
            <View
              style={{
                width: '100%',
                height: '40%',
                // backgroundColor: 'blue',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  ...Styles.type,
                  backgroundColor: '#F4F3F1',
                  // width: '35%',
                  padding:4
                }}
              >
                <Text
                  style={{
                    ...Styles.textType,
                    fontFamily: "Quicksand-Bold",
                    fontSize: 16,

                  }}
                >
                  {vocal?.pos} Adjective
                </Text>
              </View>
            </View>


            {/* number of question  */}

            <View
              style={{
                width: '100%',
                height: '25%',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',

                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  ...Styles.word,
                  fontSize: 25,

                  fontFamily: "Quicksand-Bold",
                  textAlign: "center",
                }}
              >
                {/* {vocal?.vocabId} */}
                1/10
              </Text>
            </View>
          </View>
          <View style={Styles.content}>
            <Text
              style={{
                ...Styles.word,
                fontFamily: "Quicksand-Bold",
                textAlign: "center",
              }}
            >
              {/* {vocal?.vocabId} */}
              appropriate
            </Text>
            <View style={Styles.viewPos}>
              {checkNull(vocal.phoneUs) && (
                <View style={Styles.Pos}>
                  <Text
                    style={{
                      ...Styles.word,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                    }}
                  >
                    {/* {vocal?.phoneUs} */}
                    /ˈbɔːdə(r)/
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
                    {/* {vocal?.phoneUk} */}
                    /ˈbɔːdə(r)/
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={Styles.sound}
          >
            <TouchableOpacity
              style={Styles.viewSound}
              onPress={() => playSound(vocal?.audioUk)}
              disabled={vocal.audioUs === null}
            >
              {vocal.audioUs !== null ? (
                <AntDesign name="sound" size={40} color="#402850" />
              ) : (
                <Image
                  source={require("~/assets/mute.png")}
                  style={{ width: 28, height: 28, tintColor: colors.textColor }}
                />
              )}
            </TouchableOpacity>
          </View>


          <View style={Styles.temp}></View>
          <TouchableOpacity
            style={Styles.bottom}
            onPress={() => setIsFlip(true)}
          >
            {/* <Image
              source={require("~/assets/wave.png")}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                transform: [{ rotate: "180deg" }],
                tintColor: "#4DB5AA",
              }}
            /> */}
            <Text
              style={{ ...Styles.textButton, fontFamily: "Quicksand-Bold" }}
            >
              Tap to see the definition
            </Text>
          </TouchableOpacity>
        </View>
        {/* Back Side */}
        <View style={Styles.cardBack}>
          <View style={{ ...Styles.content, marginTop: "56%" }}>
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
