import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";

import ItemSubCategory from "~/components/Home/WordList/ItemSubCategory/ItemSubCategory";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";
import { getAllSubCategory } from "~/api/Subcategory";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";

export default function YourWordlistDetail() {
  const { params } = useRoute();
  const wl = params.Wordlist;

  const [subCategories, setSubCategories] = useState([]);
  const navigation = useNavigation();
  const getSubCategory = async (id) => {
    const data = await getAllSubCategory(id);
    setSubCategories(data);
  };
  const handleStudy = () => {
    console.log("huy bui");
    navigation.navigate("StudySub", { wordlist: wl });
  };

  useEffect(() => {
    getSubCategory(wl.id);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // console.log("huy");
      getSubCategory(wl.id);
    }, [])
  );
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: 10, marginLeft: 13 }}>
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
            marginLeft: 40,
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            // alignItems: 'center',
            // position: 'relative',
          }}
        >
          <Image
            source={require("~/assets/wordlist.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              // top: -10
            }}
          />

          <View style={{ marginLeft: 10 }}>
            {/* Title */}
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 32,
                  letterSpacing: 0.2,
                  marginTop: -10,
                },
              ]}
            >
              {wl.title}
            </Text>
            {/* Description */}
            <Text
              numberOfLines={2}
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 16,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {wl.listDesc}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
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

        {/* List Subcategory */}
        <View style={styles.dropdown}>
          <FlatList
            style={{
              marginTop: 10,
              padding: 3,
              // marginBottom: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={subCategories} //subCategories.subcategoryId
            keyExtractor={(item) => item.subcategoryId}
            renderItem={({ item }) => <ItemSubCategory subcategory={item} />}
          />
        </View>

        {/* Add new Subcategory */}
        <TouchableOpacity style={styles.ButtonAdd}>
          <Ionicons
            name="add"
            size={27}
            color={colors.textTitle}
            // backgroundColor="#BBBBBB"
          />
          <Text
            style={[
              {
                color: colors.textTitle,
                fontFamily: "Quicksand-Bold",
                fontSize: 15,
              },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#CFC5EA",
  },
  header: {
    backgroundColor: "#CFC5EA",
    width: "80%",
    height: "22%",
    // borderBottomRightRadius: 60,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    // backgroundColor: "#AAAAAA",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  dropdown: {
    display: "flex",
    width: "88%",
    marginTop: 12,
    // marginBottom: 12,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    marginBottom: 20,
  },
  ButtonStudy: {
    backgroundColor: "#3D3A4D",
    borderRadius: 18,
    position: "absolute",
    right: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    top: "-3.5%",
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
    right: "3.5%",
  },
});
