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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import * as Progress from "react-native-progress";
import ItemCardReview from "~/components/Game/CardReview/ItemCardReview";
import Carousel from "react-native-reanimated-carousel";
import ItemCardFlashcard from "~/components/Game/CardFlashcard/ItemCardFlashcard";
export default function FlashcardScreen() {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef(null);
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];
  const handleNextSlide = () => {
    const nextSlide = currentSlide + 1;
    const progress = data.length / 8;
    if (nextSlide < data.length) {
      scrollViewRef.current.scrollTo({
        x: nextSlide * Math.floor(screenWidth - 40),
        animated: true,
      });
      setProgress(progress * nextSlide);
      setCurrentSlide(nextSlide);
    }
    if (nextSlide === data.length) {
      setProgress(progress * nextSlide);
    }
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity>
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
        <Text style={Styles.titleHeader}>Subcategory 1</Text>
      </View>
      <View style={Styles.wrappered}>
        <View style={Styles.progress}>
          <Progress.Bar
            progress={progress}
            width={Math.floor(screenWidth) - 40}
            height={8}
          />
          <Text style={Styles.numberCount}>0</Text>
          <Text style={Styles.numberTotal}>20</Text>
        </View>


        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={{
            // marginTop: 35,
            width: Math.floor(screenWidth - 40),
            height:690
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
                <ItemCardFlashcard onNextSlider={handleNextSlide} />
              </View>
            </View>
          ))}
        </ScrollView>


        {/* <Carousel
          loop={false}
          width={Math.floor(screenWidth) - 40}
          height={690}
          data={data}
          scrollAnimationDuration={100}
          renderItem={({ index }) => (
            <View style={Styles.content}>
              <ItemCardFlashcard onNextSlider={handleNextSlide} />
            </View>
          )}
        /> */}


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
    marginTop: 35,
    // marginLeft:3,
    alignItems: "center",
    // flex: 1,
    // backgroundColor: "red",
  },
});
