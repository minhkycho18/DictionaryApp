import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LeitnerItem from "~/components/Leitner/LeitnerItem/LeitnerItem";
import { useNavigation } from "@react-navigation/native";
import { getInforBoxOfUser } from "~/api/Leitner";
export default function Leitner() {
  const navigation = useNavigation();

  const [boxes, setBoxes] = useState([]);
  const getBoxes = async () => {
    try {
      const res = await getInforBoxOfUser();
      setBoxes(res);
    } catch (error) {}
  };
  useEffect(() => {
    getBoxes();
  }, []);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.header}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPressIn={() => navigation.goBack()}
          >
            <Entypo
              name="chevron-left"
              size={25}
              color={colors.textTitle}
              style={{ marginTop: 4 }}
            />
          </TouchableOpacity>
          <Text style={Styles.textHeader}>Leitner</Text>
        </View>
        <View style={Styles.content}>
          <View style={Styles.circle_large}>
            <View style={Styles.circle_medium}>
              <View style={Styles.circle_small}>
                <View>
                  <Text style={{ ...Styles.textHeader, textAlign: "center" }}>
                    GO!
                  </Text>
                  <Text style={{ color: colors.textColor }}>
                    Click to start
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.content_right}>
            <View style={Styles.content_item}>
              <View style={Styles.icon}>
                <Image
                  source={require("~/assets/history.png")}
                  style={{ width: 20, height: 20, tintColor: colors.textTitle }}
                />
              </View>
              <View style={{ width: 80 }}>
                <Text style={Styles.content_item__text}>Waiting</Text>
              </View>
              <Text
                style={{
                  ...Styles.content_item__text,
                  color: colors.textTitle,
                }}
              >
                0
              </Text>
            </View>
            {/*  */}
            <View style={Styles.content_item}>
              <View style={Styles.icon}>
                <Image
                  source={require("~/assets/book.png")}
                  style={{ width: 23, height: 23, tintColor: colors.textTitle }}
                />
              </View>
              <View style={{ width: 80 }}>
                <Text style={Styles.content_item__text}>Learning</Text>
              </View>
              <Text
                style={{
                  ...Styles.content_item__text,
                  color: colors.textTitle,
                }}
              >
                0
              </Text>
            </View>
            {/*  */}
            <View style={Styles.content_item}>
              <View style={Styles.icon}>
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color={colors.textTitle}
                />
              </View>
              <View style={{ width: 80 }}>
                <Text style={Styles.content_item__text}>Learned</Text>
              </View>
              <Text
                style={{
                  ...Styles.content_item__text,
                  color: colors.textTitle,
                }}
              >
                0
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.boxes}>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ ...Styles.textHeader, color: "#0A1741" }}>
              Leitner Boxes
            </Text>
          </View>
          {boxes.map((item, index) => (
            <View key={index}>
              <LeitnerItem type={item} />
              {index !== 7 && <View style={Styles.line}></View>}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 20,
    alignItems: "center",
    height: 50,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: colors.textTitle,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: "#EEECEE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  content_right: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  content_item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  content_item__text: {
    fontSize: 16,
    fontFamily: "Quicksand-Bold",
    color: colors.textColor,
  },
  circle_large: {
    width: 150,
    height: 150,
    backgroundColor: "#eeeeee",
    borderRadius: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  circle_medium: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  circle_small: {
    width: 110,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#efb452",
    justifyContent: "center",
    alignItems: "center",
  },
  boxes: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "rgb(241 245 249)",
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  line: {
    position: "absolute",
    width: 2,
    height: 75,
    backgroundColor: "#ccc",
    bottom: "-23%",
    left: "4.5%",
  },
});
