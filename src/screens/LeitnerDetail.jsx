import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";
import ItemVocabOfLeitner from "~/components/Leitner/ItemVocabOfLeitner/ItemVocabOfLeitner";
import { getVocabOfLeitnerLevelOfUser } from "~/api/Leitner";
import SplashScreen from "~/components/SplashScreen";

export default function LeitnerDetail(props) {
  const level = props.route.params.level;
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [listVocabOfLeitner, setListVocabOfLeitner] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [offset, setOffset] = useState(6);

  const getVocabOfLeitnerLevel = async (level) => {
    const data = await getVocabOfLeitnerLevelOfUser(level);
    setTotal(data.totalElements);
    setListVocabOfLeitner(data.content);
  };
  const handleStudy = () => {
    navigation.push("FlashcardLeitnerScreen", { level: level });
  };

  useEffect(() => {
    console.log(typeof level);
    getVocabOfLeitnerLevel(level);
  }, []);
  const handleEndReach = async () => {
    if (listVocabOfLeitner.length > 5) {
      try {
        setShowLoader(true);
        const data = await getVocabOfLeitnerLevelOfUser(level, offset);
        if (data.content.length > 0) {
          setListVocabOfLeitner([...listVocabOfLeitner, ...data.content]);
        }

        setOffset(offset + 6);
        setShowLoader(false);
      } catch (error) {
        console.log(`error ::`, error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginLeft: 13,
            paddingBottom: 10,
          }}
        >
          <Entypo
            name="chevron-left"
            size={24}
            color="#182B40"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View>
            {/* Title */}
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 28,
                  letterSpacing: 0.2,
                  marginTop: -10,
                },
              ]}
            >
              Leitner box Pending
            </Text>
            {/* Description */}

            <Text
              style={[
                {
                  marginTop: 10,
                  color: colors.gray,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {total <= 1 ? `${total} word` : `${total} words`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
        {level !== "0" && (
          <TouchableOpacity
            style={styles.ButtonStudy}
            onPress={() => handleStudy()}
          >
            <SvgXml width="30" height="30" xml={svgstudy} />
            <Text
              style={[
                {
                  color: "#FFF7FF",
                  fontFamily: "Quicksand-SemiBold",
                  marginLeft: 5,
                  fontSize: 15,
                },
              ]}
            >
              Study
            </Text>
          </TouchableOpacity>
        )}

        {listVocabOfLeitner.length > 0 ? (
          <FlatList
            style={{
              padding: 3,
            }}
            showsVerticalScrollIndicator={false}
            data={listVocabOfLeitner}
            keyExtractor={(item) => item.definition.defId}
            renderItem={(item) => <ItemVocabOfLeitner Vocab={item} />}
            onEndReached={handleEndReach}
            ListFooterComponent={showLoader && <SplashScreen />}
          />
        ) : (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60%",
            }}
          >
            <Image
              source={require("~/assets/empty.png")}
              style={{ width: 200, height: 120 }}
            />
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Quicksand-SemiBold",
                fontSize: 18,
                color: colors.textTitle,
              }}
            >
              You don't have any words yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#F2F5FE",
  },
  header: {
    backgroundColor: "#F2F5FE",
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  ButtonStudy: {
    backgroundColor: "#3D3A4D",
    borderRadius: 18,
    position: "absolute",
    right: "6.6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    top: "-9.5%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    // marginRight: 1
  },
  ButtonAdd: {
    // display: "flex",
    backgroundColor: "#D0C6EB",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "90%",
    // bottom: 20,
    right: "3.6%",
  },
  ButtonDelete: {
    // display: "flex",
    backgroundColor: "rgb(225 29 72)",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "91%",
    left: "50%",
    transform: [{ translateX: -50 }],
    textAlign: "center",
  },
  viewBottomSheet: {
    marginHorizontal: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "77%",
  },
});
