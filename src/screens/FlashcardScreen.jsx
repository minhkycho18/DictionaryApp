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
import ItemCardFlashcard from "~/components/Game/CardFlashcard/ItemCardFlashcard";
import { getGameFromSub, updateStatusGame } from "~/api/Game";
import ResultGame from "~/components/Game/ResultGame";
import { AuthContext } from "~/context/AuthContext";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { delay } from "~/helper";

export default function FlashcardScreen(props) {
  const { setIsFlashcard, setlistFlashCardError } = useContext(AuthContext);
  const [listAnswer, setListAnswer] = useState([]);
  const [data, setData] = useState([]);
  const [countFail, setCountFail] = useState(0);
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
    if (nextSlide < data.length - 1) {
      setCount(nextSlide);
    }
    const progress = 1 / (data.length - 2);
    if (nextSlide < data.length) {
      if (obj.answer) {
        setListAnswer((pre) => [...pre, obj.vocal]);
      } else {
        setCountFail((pre) => pre + 1);
      }
      scrollViewRef.current.scrollTo({
        x: nextSlide * Math.floor(screenWidth - 40),
        animated: true,
      });
      setProgress(progress * nextSlide);
      setCurrentSlide(nextSlide);
    }
  };
  const getGame = async (wordListId, subId, type) => {
    const specialCardData = { special: true };
    const res = await getGameFromSub(wordListId, subId, type);
    setData([...res, specialCardData]);
  };

  useEffect(() => {
    setlistFlashCardError([]);
    getGame(
      props.route.params.wordListId,
      props.route.params.subcategoryId,
      "flashcard"
    );
  }, []);

  const handleAddVocabToLeitner = async (text1, text2, type) => {
    showToast(text1, text2, type);

    if (type === "success") {
      await delay(500);
      const res = await updateStatusGame(
        props.route.params.wordListId,
        props.route.params.subcategoryId,
        "flashcard",
        listAnswer
      );
      console.log("test 1::", res);
      console.log(res);
      setIsFlashcard(true);
      navigation.push("FinishGame", { type: "flashcard" });
    }
  };

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1500,
      autoHide: true,
      topOffset: 40,
    });
  };

  const handleRedirect = async () => {
    try {
      if (listAnswer.length > 0) {
        const resResult = await updateStatusGame(
          props.route.params.wordListId,
          props.route.params.subcategoryId,
          "flashcard",
          listAnswer
        );
        console.log(resResult);
      }
      navigation.goBack();
    } catch (error) {}
  };

  const handleContinue = async () => {
    console.log(`check ::`, listAnswer);
    const res = await updateStatusGame(
      props.route.params.wordListId,
      props.route.params.subcategoryId,
      "flashcard",
      listAnswer
    );
    console.log(res);
    setIsFlashcard(true);
    navigation.push("FinishGame", { type: "flashcard" });
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
          <Text style={Styles.numberTotal}>{data?.length - 1}</Text>
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
              {item.special ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: 50,
                    alignItems: "center",
                  }}
                >
                  <ResultGame
                    result={{
                      correct: listAnswer.length,
                      incorrect: countFail,
                      type: "Flashcard",
                    }}
                    onContinue={handleContinue}
                    onShowToast={(text1, text2, type) =>
                      handleAddVocabToLeitner(text1, text2, type)
                    }
                  />
                </View>
              ) : (
                <View style={Styles.content}>
                  <ItemCardFlashcard
                    onNextSlider={(vocal) => handleNextSlide(vocal)}
                    vocal={item}
                    totalQuestion={data.length}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />

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
