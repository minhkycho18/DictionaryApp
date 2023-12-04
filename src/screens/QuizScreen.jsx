import React, { useEffect, useRef, useState, useContext } from "react";
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
import * as Progress from "react-native-progress";
import { getWordListByWordlistId } from "~/api/WordList";
import { getGameFromSub, updateStatusGame } from "~/api/Game";
import ItemCardQuiz from "~/components/Game/CardQuiz/ItemCardQuiz";
import { AuthContext } from "~/context/AuthContext";
export default function QuizScreen(props) {
  const { setIsQuiz } = useContext(AuthContext);
  const [listAnswer, setListAnswer] = useState([]);
  const [listIncorrectAnswer, setListIncorrectAnswer] = useState([]);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const handleNextSlide = async (obj) => {
    const nextSlide = currentSlide + 1;
    setCount(nextSlide);
    const progress = 1 / (data.length - 1);
    if (nextSlide < data.length) {
      if (obj.answer) {
        setListAnswer((pre) => [...pre, obj.vocal]);
        // console.log('Da them tu \n');
      } else {
        setListIncorrectAnswer((pre) => [...pre, obj.vocal]);
        // console.log('Da them tu sai \n');
      }

      scrollViewRef.current.scrollTo({
        x: nextSlide * Math.floor(screenWidth - 40),
        animated: true,
      });
      setProgress(progress * nextSlide);
      setCurrentSlide(nextSlide);
    }
    if (nextSlide === data.length) {
      let updateResult = [...listAnswer];
      let updateIncorrectResult = [...listIncorrectAnswer];

      if (obj.answer) {
        updateResult.push(obj.vocal);
        // console.log('Da them tu \n');
      } else {
        updateIncorrectResult.push(obj.vocal);
        // console.log('Da them tu sai \n');
      }
      console.log(updateResult);
      await updateStatusGame(
        props.route.params.wordListId,
        props.route.params.subcategoryId,
        "quiz",
        updateResult
      );
      setIsQuiz(true);
      navigation.push("FinishQuiz", {
        quiz_number_question: numberQuestion,
        quiz_result: updateIncorrectResult,
      });
    }
  };
  const getGame = async (wordListId, subId, type) => {
    const res = await getGameFromSub(wordListId, subId, type);
    setData(res);
    setNumberQuestion(res.length);
  };

  useEffect(() => {
    getGame(
      props.route.params.wordListId,
      props.route.params.subcategoryId,
      "quiz"
    );
  }, []);

  const handleRedirect = async () => {
    try {
      if (listAnswer.length > 0) {
        const resResult = await updateStatusGame(
          props.route.params.wordListId,
          props.route.params.subcategoryId,
          "quiz",
          listAnswer
        );
        console.log(resResult);
      }
      navigation.goBack();
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
                <ItemCardQuiz onNextSlider={handleNextSlide} vocal={item} />
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
    marginTop: 20,
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
    height: "80%",
    marginTop: "12%",
    // marginLeft:3,
    alignItems: "center",
    // flex: 1,
    // backgroundColor: "red",
  },
});
