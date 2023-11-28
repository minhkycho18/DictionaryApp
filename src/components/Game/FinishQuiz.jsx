import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native";
import ItemVocabOfQuizResult from "~/components/Game/ItemVocabOfQuizResult/ItemVocabOfQuizResult";
import { colors, svgStudy } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { getWordListByWordlistId } from "~/api/WordList";
import { AuthContext } from "~/context/AuthContext";
import ItemVocabOfFlashcardResult from "./ItemVocabOfFlashcardResult/ItemVocabOfFlashcardResult";
// const { Clock } = Animated;
export default function FinishQuiz(props) {
  const {
    listSpellingError,
    setlistSpellingError,
    listFlashCardError,
    setlistFlashCardError,
  } = useContext(AuthContext);
  const { params } = useRoute();
  const [selectedBtn, setSelectedBtn] = useState("quiz");
  const [checkChoice, setCheckChoice] = useState(true);
  const [quizResult, setQuizResult] = useState(props.route.params.quiz_result);
  const [numberQuestion, setNumberQuestion] = useState(
    props.route.params.quiz_number_question
  );

  // console.log("test list receive: \n\n", quizResult)
  const navigation = useNavigation();
  const data_test = [
    {
      id: "1",
      result: "true",
      word: "greedy",
      question: "immoderately desirous of acquiring e.g. wealth",
      choose: "false",
    },
    {
      id: "2",
      result: "false",
      word: "precautionary",
      question:
        "lotion consisting of an astringent alcoholic solution containing an extract from the witch hazel plant",
      answer: "taken in advance to protect against possible danger or failure",
      choose: "true",
    },
    {
      id: "1",
      result: "true",
      word: "witch hazel",
      question:
        "lotion consisting of an astringent alcoholic solution containing an extract from the witch hazel plant",
      choose: "false",
    },
  ];

  // useEffect(() => {
  //   // getSubCategory(wl.id);
  // }, [selectedBtn]);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const handleRedirect = async () => {
    setlistSpellingError([]);
    setlistFlashCardError([]);
    try {
      const res = await getWordListByWordlistId(props.route.params.wordListId);
      navigation.navigate("StudySub", { wordlist: res });
    } catch (error) {}
  };

  const handleAnswerPress = (text) => {
    setSelectedBtn(text);
    setCheckChoice(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Progress + Title */}
          <View style={styles.card}>
            <View style={styles.card_header}>
              {/* Text */}
              <View
                style={{
                  margin: 30,
                }}
              >
                {/* Title */}
                <Text style={styles.label_title}>Well done!</Text>

                {/* Description */}
                <Text numberOfLines={2} style={styles.label_notice}>
                  You have successfully finished the test.
                </Text>
              </View>
            </View>

            {/* Button Quiz */}
            <View style={styles.card_body}>
              <View style={styles.item_body}>
                <TouchableOpacity
                  onPress={() => handleAnswerPress("flashcard")}
                  style={[
                    styles.BtnResult,
                    {
                      backgroundColor:
                        selectedBtn === "flashcard" ? "#F1F7FC" : "#fff",
                    },
                  ]}
                >
                  <View>
                    <View
                      style={[
                        {
                          ...styles.square,
                        },
                        {
                          ...styles.icon,
                          borderColor: "#37CABE",
                        },

                        {
                          backgroundColor:
                            selectedBtn === "flashcard" ? "#F1F7FC" : "#fff",
                        },
                      ]}
                    >
                      <SvgXml
                        width="25"
                        height="25"
                        xml={svgStudy("flashcard", "#37CABE")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                    }}
                  >
                    <Text style={[styles.number]}>2 / 6</Text>
                    <Text numberOfLines={2} style={[styles.label_correct]}>
                      Correct answers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.item_body}>
                <TouchableOpacity
                  onPress={() => handleAnswerPress("spelling")}
                  style={[
                    styles.BtnResult,
                    {
                      backgroundColor:
                        selectedBtn === "spelling" ? "#F1F7FC" : "#fff",
                    },
                  ]}
                >
                  <View>
                    <View
                      style={[
                        {
                          ...styles.square,
                        },
                        {
                          ...styles.icon,
                          borderColor: "#B7ADFF",
                        },
                        {
                          backgroundColor:
                            selectedBtn === "spelling" ? "#F1F7FC" : "#fff",
                        },
                      ]}
                    >
                      <SvgXml
                        width="25"
                        height="25"
                        xml={svgStudy("spelling", "#B7ADFF")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                    }}
                  >
                    <Text style={[styles.number]}>2 / 6</Text>
                    <Text numberOfLines={2} style={[styles.label_correct]}>
                      Correct answers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.item_body}>
                <TouchableOpacity
                  onPress={() => handleAnswerPress("quiz")}
                  style={[
                    styles.BtnResult,
                    {
                      backgroundColor:
                        selectedBtn === "quiz" ? "#F1F7FC" : "#fff",
                    },
                  ]}
                >
                  <View>
                    <View
                      style={[
                        {
                          ...styles.square,
                        },
                        {
                          ...styles.icon,
                          borderColor: "#0766AD",
                        },
                        {
                          backgroundColor:
                            selectedBtn === "quiz" ? "#F1F7FC" : "#fff",
                        },
                      ]}
                    >
                      <SvgXml
                        width="25"
                        height="25"
                        xml={svgStudy("quiz", "#0766AD")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                    }}
                  >
                    <Text style={[styles.number]}>
                      {numberQuestion - quizResult.length} / {numberQuestion}
                    </Text>
                    <Text numberOfLines={2} style={[styles.label_correct]}>
                      Correct answers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Finish */}
            <View style={styles.card_footer}>
              <View style={styles.footer_content}>
                <TouchableOpacity
                  style={[styles.btnDone]}
                  onPress={handleRedirect}
                >
                  <Text style={styles.label_btnDone}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* {listFlashCardError.map((item, index) => (
            <ItemVocabOfFlashcardResult
              key={index}
              Vocab={item}
              index={index + 1}
            />
          ))} */}
          {listSpellingError.map((item, index) => (
            <ItemVocabOfQuizResult key={index} Vocab={item} index={index + 1} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  main: {
    width: "95%",
    display: "flex",
    gap: 15,
    height: "100%",
  },
  card: {
    display: "flex",
    width: "100%",
    height: 464,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,

    elevation: 4,
    marginTop: 20,
    marginBottom: 15,
  },
  card_header: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 111.25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  label_title: {
    color: "#1A3C80",
    fontFamily: "Quicksand-Bold",
    fontSize: 28,
    letterSpacing: 0.2,
  },
  label_notice: {
    color: "#6E727A",
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
    letterSpacing: 0.1,
    marginTop: 10,
  },
  card_body: {
    width: "100%",
    height: 270,
    backgroundColor: "#FFFFFF",
    display: "flex",
  },
  item_body: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 90,
    justifyContent: "space-around",
    // backgroundColor: 'red'
  },
  icon: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 15,
  },
  number: {
    color: "#1A3C80",
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
    letterSpacing: 0.2,
  },
  label_correct: {
    color: "#6E727A",
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
    letterSpacing: 0.1,
    textAlign: "center",
  },
  card_footer: {
    width: "100%",
    height: 80.5,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer_content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 5,
  },
  label_btnDone: {
    fontFamily: "Quicksand-Bold",
    fontSize: 17,
    color: "#FFFFFF",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    height: "7.9%",
  },
  titleHeader: {
    fontFamily: "Quicksand-Bold",
    fontSize: 17,
    color: "#5E5E5E",
    letterSpacing: 0.15,
  },

  btnDone: {
    width: 90,
    height: 37,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D47A1",
  },
  square: {
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  BtnResult: {
    width: "82.5%",
    height: 78.57,
    backgroundColor: "#fff",
    borderLeftWidth: 7,
    borderLeftColor: "#3D6CB4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
    borderRadius: 10,

    display: "flex",
    alignItems: "center",
    // justifyContent: 'center',
    flexDirection: "row",
  },
  btn_Done: {
    width: 80,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2395F1",
    position: "absolute",
    top: "85%",
    right: "9%",
  },
});
