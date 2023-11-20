import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getWordListByWordlistId } from "~/api/WordList";
export default function FinishGame(props) {
  const state = ["success", "pending", "waiting"];
  const [review, setRiview] = useState("waiting");
  const [flascard, setFlascard] = useState("waiting");
  const [spelling, setSpelling] = useState("waiting");
  const [quiz, setQuiz] = useState("waiting");
  const navigation = useNavigation();
  useEffect(() => {
    if (props.route.params.type === "review") {
      setRiview(state[0]);
      setFlascard(state[1]);
    }
    if (props.route.params.type === "flashcard") {
      setRiview(state[0]);
      setFlascard(state[0]);
      setSpelling(state[1]);
    }
    if (props.route.params.type === "spelling") {
      setRiview(state[0]);
      setFlascard(state[0]);
      setSpelling(state[0]);
      setQuiz(state[1]);
    }
  }, []);
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const Success = () => (
    <View style={Styles.circle}>
      <Feather name="check" size={24} color="#fff" />
    </View>
  );
  const Pending = () => (
    <View style={Styles.peding}>
      <Entypo name="controller-record" size={20} color="#56BDB5" />
    </View>
  );
  const Waiting = () => (
    <View style={Styles.waiting}>
      <Entypo name="controller-record" size={20} color="#C7CFD1" />
    </View>
  );
  const getStatusStyle = (status) => {
    switch (status) {
      case "success":
        return Styles.buttonSuccess;
      case "pending":
        return Styles.buttonPending;
      case "waiting":
      default:
        return Styles.buttonWaiting;
    }
  };
  const getProgess = (status) => {
    switch (status) {
      case "success":
        return <Success />;
      case "pending":
        return <Pending />;
      case "waiting":
      default:
        return <Waiting />;
    }
  };
  const getTextStyle = (status) => {
    switch (status) {
      case "success":
        return Styles.textButtonSuccess;
      case "pending":
        return Styles.textButtonPending;
      case "waiting":
      default:
        return Styles.textButtonWaiting;
    }
  };
  const getLineStyle = (status) => {
    switch (status) {
      case "success":
        return Styles.lineSuccess;
      default:
        return Styles.linePending;
    }
  };
  const handleRedirect = async () => {
    try {
      const res = await getWordListByWordlistId(props.route.params.wordListId);
      navigation.navigate("StudySub", { wordlist: res });
    } catch (error) {}
  };
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
        <Text style={Styles.titleHeader}>{props.route.params.title}</Text>
      </View>
      <View style={Styles.wrappered}>
        <Image source={require("~/assets/success.png")} style={Styles.image} />
        <Text style={Styles.toast}>
          You've finished {props.route.params.type} successfully
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 40,
            gap: 40,
          }}
        >
          <View
            style={{
              ...Styles.viewButton,
              // marginRight: review === "success" ? 15 : 0,
            }}
          >
            <View style={Styles.viewCircle}>{getProgess(review)}</View>
            <TouchableOpacity style={[getStatusStyle(review)]}>
              <Text style={[getTextStyle(review)]}>Review</Text>
            </TouchableOpacity>
            <View style={[getLineStyle(review)]}></View>
          </View>
          {/*  */}

          <View
            style={{
              ...Styles.viewButton,
              // marginRight: flascard === "success" ? 15 : 0,
            }}
          >
            <View style={Styles.viewCircle}>{getProgess(flascard)}</View>
            <TouchableOpacity
              style={[getStatusStyle(flascard)]}
              onPress={() => navigation.push("FlashCardScreen")}
            >
              <Text style={[getTextStyle(flascard)]}>Flashcard Practice</Text>
            </TouchableOpacity>
            <View style={[getLineStyle(flascard)]}></View>
          </View>
          {/*  */}
          <View
            style={{
              ...Styles.viewButton,
              // marginRight: spelling === "success" ? 15 : 0,
            }}
          >
            <View style={Styles.viewCircle}>{getProgess(spelling)}</View>
            <TouchableOpacity
              style={[getStatusStyle(spelling)]}
              onPress={() => navigation.push("SpellingScreen")}
            >
              <Text style={[getTextStyle(spelling)]}>Spelling Practice</Text>
            </TouchableOpacity>
            <View style={[getLineStyle(spelling)]}></View>
          </View>
          {/*  */}

          <View
            style={{
              ...Styles.viewButton,
              // marginRight: quiz === "success" ? 15 : 0,
            }}
          >
            <View style={Styles.viewCircle}>{getProgess(quiz)}</View>
            <TouchableOpacity 
            style={[getStatusStyle(quiz)]}
            onPress={() => navigation.push("QuizScreen")}
            >
              <Text style={[getTextStyle(quiz)]}>Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  wrappered: {
    marginTop: "7%",
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
  image: {
    // width: 200,
    // height: 200,
  },
  toast: {
    color: "#24416A",
    fontFamily: "Quicksand-Bold",
    fontSize: 17,
    marginTop: "5%",
  },
  viewCircle: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#1CBD9E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    gap: 18,
  },
  peding: {
    width: 32,
    height: 32,
    backgroundColor: "#D2EBE7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  waiting: {
    width: 32,
    height: 32,
    backgroundColor: "#EAECEE",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPending: {
    backgroundColor: "#1CBD9E",
    paddingVertical: 10,
    borderRadius: 20,
    width: 230,
  },
  textButtonPending: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },

  buttonSuccess: {
    backgroundColor: "#F0F4F3",
    width: 230,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textButtonSuccess: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#1CBD9E",
    textAlign: "center",
  },
  buttonWaiting: {
    backgroundColor: "#F0F4F3",
    width: 230,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textButtonWaiting: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#419DE6",
    textAlign: "center",
  },
  lineSuccess: {
    width: 4,
    height: 38,
    backgroundColor: "#1CBD9E",
    position: "absolute",
    bottom: -39,
    left: "6.5%",
    borderRadius: 5,
  },
  linePending: {
    width: 4,
    height: 40,
    backgroundColor: "#E6E6E6",
    position: "absolute",
    bottom: -38,
    left: "6.5%",
    borderRadius: 5,
  },
});
