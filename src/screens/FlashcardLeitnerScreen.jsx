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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import ListBoxesGame from "~/components/Leitner/ListBoxesGame";
import CardFlashcard_Leitner from "~/components/Game/CardFlashcard_Leitner/CardFlashcard_Leitner";
import { getDataForGame } from "~/api/Leitner";
import Modal from "react-native-modal";
import { delay } from "~/helper";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      if (level !== "7") {
        setChangeLevel({
          levelUp: (parseInt(level) + 1).toString(),
          level: level,
          answer: true,
        });
      }
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
    } else {
      await delay(2000);
      setIsModalVisible(true);
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

      {/* Modal */}
      <View>
        <Modal
          animationType="slide"
          isVisible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={Styles.modal_container}>
            <View style={Styles.modal_content}>
              <View
                style={{
                  width: "100%",
                  height: "75%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Image
                  source={require("~/assets/successLeitner.png")}
                  style={Styles.icon}
                />
                <Text
                  style={{ fontFamily: "Quicksand-SemiBold", fontSize: 15 }}
                >
                  You have finished all the cards for this level
                </Text>
              </View>
              <View style={Styles.modal_view_button}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("HomeLeitner")}
                >
                  <Text
                    style={{
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 18,
                      color: "#C2BAEE",
                    }}
                  >
                    Back to home
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  modal_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_content: {
    backgroundColor: "#D6D3F4",
    width: "95%",
    height: 200,
    borderRadius: 10,
    position: "relative",
    flexDirection: "column",
  },
  modal_view_button: {
    borderTopWidth: 2,
    borderTopColor: "#A99CEE",
    backgroundColor: "#fff",
    width: "100%",
    height: "25%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
