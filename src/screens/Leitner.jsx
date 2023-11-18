import React from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LeitnerItem from "~/components/Leitner/LeitnerItem/LeitnerItem";
export default function Leitner() {
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.header}>
          <TouchableOpacity style={{ padding: 5 }}>
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
              Boxes
            </Text>
          </View>
          <View>
            <LeitnerItem type={{ number: 1, day: "every day" }} />
            <View style={Styles.line}></View>
          </View>
          <View>
            <LeitnerItem type={{ number: 2, day: "every 2 days" }} />
            <View style={Styles.line}></View>
          </View>
          <View>
            <LeitnerItem type={{ number: 3, day: "every 4 days" }} />
            <View style={Styles.line}></View>
          </View>
          <View>
            <LeitnerItem type={{ number: 4, day: "every 8 days" }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    height: 600,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  line: {
    position: "absolute",
    width: 3,
    height: 71,
    backgroundColor: "#ccc",
    bottom: "-21%",
    left: "5%",
  },
});
