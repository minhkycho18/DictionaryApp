import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import * as Progress from "react-native-progress";
import ItemCardReview from "~/components/Game/CardReview/ItemCardReview";
import Carousel from "react-native-reanimated-carousel";
import { getGameFromSub } from "~/api/Game";
import { useNavigation } from "@react-navigation/native";
import { delay } from "~/helper";
import FinishReview from "~/components/Game/FinishReview";

export default function ReviewScreen(props) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const getGame = async (wordListId, subId, type) => {
    const specialCardData = { special: true };
    const res = await getGameFromSub(wordListId, subId, type);
    setData([...res, specialCardData]);
  };
  useEffect(() => {
    getGame(
      props.route.params.wordListId,
      props.route.params.subcategoryId,
      "review"
    );
  }, []);
  const handleScroll = (index) => {
    if (index < data.length - 1) {
      const prog = 1 / (data.length - 2);
      setProgress(index * prog);
      setCount(index);
    }
  };

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <View style={Styles.progress}>
          <Progress.Bar
            progress={progress}
            width={Math.floor(screenWidth) - 40}
            height={8}
          />
          <Text style={Styles.numberCount}>{count}</Text>
          <Text style={Styles.numberTotal}>{data.length - 1}</Text>
        </View>
        <Carousel
          loop={false}
          width={Math.floor(screenWidth) - 40}
          height={690}
          data={data}
          scrollAnimationDuration={1}
          renderItem={({ item }) => (
            <View style={Styles.content}>
              {item.special ? (
                <FinishReview />
              ) : (
                <ItemCardReview vocal={item} />
              )}
            </View>
          )}
          onSnapToItem={(index) => handleScroll(index)}
        />
      </View>

      {/* </View> */}
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
    height: "80%",
    marginTop: "12%",

    alignItems: "center",
    // flex: 1,
    // backgroundColor: "red",
  },
});
