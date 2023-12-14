import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import ListBoxesGame from "~/components/Leitner/ListBoxesGame";
import CardFlashcard_Leitner from "~/components/Game/CardFlashcard_Leitner/CardFlashcard_Leitner";
import { getDataForGame } from "~/api/Leitner";
export default function FlashcardLeitnerScreen(props) {
  const [data, setData] = useState([]);
  const [changeLevel, setChangeLevel] = useState({});
  const [downLevel, setDownLevel] = useState({});
  const [level, setLevel] = useState(props.route.params.level);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const getGame = async () => {
    try {
      const res = await getDataForGame(level);
      setData(res);
    } catch (error) {
      console.log("get game leitner ::", error);
    }
  };

  const handleNextSlide = async (obj) => {
    if (obj.upLevel) {
      setChangeLevel({
        levelUp: (parseInt(level) + 1).toString(),
        level: level,
        answer: true,
      });
    } else {
      setChangeLevel({
        levelUp: (parseInt(level) - 1).toString(),
        level: level,
        answer: false,
      });
    }
    const nextSlide = currentSlide + 1;
    if (nextSlide < data.length) {
      scrollViewRef.current.scrollTo({
        x: nextSlide * Math.floor(screenWidth - 40),
        animated: true,
      });
      setCurrentSlide(nextSlide);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  const handleRedirect = async () => {
    navigation.goBack();
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={handleRedirect}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={colors.textTitle}
            style={{
              marginTop: 4,
              marginLeft: Platform.OS === "ios" ? 20 : 0,
            }}
          />
        </TouchableOpacity>
        <Text style={Styles.titleHeader}>Leitner Review</Text>
      </View>
      <View style={Styles.wrappered}>
        <View style={Styles.progress}>
          <ListBoxesGame level={level} changeLevel={changeLevel} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={{
            // marginTop: 35,
            width: Math.floor(screenWidth - 40),
            height: 690,
          }}
          scrollEnabled={false}
        >
          {data.map((item, index) => (
            <View
              style={{
                width: Math.floor(screenWidth - 40),
                height: 690,
                borderRadius: 40,
                alignItems: "center",
              }}
              key={index}
            >
              <View style={Styles.content}>
                <CardFlashcard_Leitner
                  onNextSlider={(obj) => handleNextSlide(obj)}
                  vocal={item}
                  totalQuestion={{
                    index: index + 1,
                    total: data.length,
                  }}
                  level={level}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  wrappered: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    // paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    height: 50,
  },
  titleHeader: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    color: colors.textTitle,
  },
  progress: {
    marginTop: 5,
    width: "100%",
    position: "relative",
    height: 100,
  },
  numberTotal: {
    position: "absolute",
    top: -20,
    right: 0,
    fontFamily: "Quicksand-SemiBold",
    color: "gray",
  },
  numberCount: {
    position: "absolute",
    top: -20,
    fontFamily: "Quicksand-SemiBold",
    color: "gray",
  },

  content: {
    width: "100%",
    height: "80%",
    marginTop: "7%",
    // marginLeft:3,
    alignItems: "center",
    // flex: 1,
    // backgroundColor: "red",
  },
});
