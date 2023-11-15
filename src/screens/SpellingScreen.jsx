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
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import * as Progress from "react-native-progress";
import ItemCardSpelling from "~/components/Game/CardSpelling/ItemCardSpelling";
import { getGameFromSub } from "~/api/Game";
import { useNavigation } from "@react-navigation/native";
import { getWordListByWordlistId } from "~/api/WordList";
export default function SpellingScreen(props) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const getGame = async (wordListId, subId, type) => {
    const res = await getGameFromSub(wordListId, subId, type);
    setData(res);
  };
  useEffect(() => {
    getGame(
      props.route.params.wordListId,
      props.route.params.subcategoryId,
      "spelling"
    );
  }, []);
  const handleNextSlide = () => {
    const nextSlide = currentSlide + 1;
    setCount(nextSlide);
    const progress = 1 / (data.length - 1);
    if (nextSlide < data.length) {
      scrollViewRef.current.scrollTo({
        x: nextSlide * Math.floor(screenWidth - 40),
        animated: true,
      });
      setProgress(progress * nextSlide);
      setCurrentSlide(nextSlide);
    }
    if (nextSlide === data.length) {
      // setProgress(progress * nextSlide);
      navigation.push("FinishGame", { type: "spelling" });
    }
  };
  const handleRedirect = async () => {
    try {
      const res = await getWordListByWordlistId(props.route.params.wordListId);
      navigation.navigate("StudySub", { wordlist: res });
    } catch (error) {}
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
        <Text style={Styles.titleHeader}>{props.route.params?.title}</Text>
      </View>
      <View style={Styles.wrappered}>
        <View style={Styles.progress}>
          <Progress.Bar
            progress={progress}
            width={Math.floor(screenWidth) - 40}
            height={8}
          />
          <Text style={Styles.numberCount}>{count}</Text>
          <Text style={Styles.numberTotal}>{data?.length}</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={{
            marginTop: 35,
            width: Math.floor(screenWidth - 40),
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
              <ItemCardSpelling onNextSlider={handleNextSlide} vocal={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    marginTop: 40,
    position: "relative",
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
    height: 600,
    marginTop: 50,
    // alignItems: "center",
    // flex: 1,
    // backgroundColor: "red",
  },
});
